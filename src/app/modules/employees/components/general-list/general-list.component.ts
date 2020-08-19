import { DataStorageService } from './../../../../shared/data-storage.service';
import { Employee } from 'src/app/shared/models/employees.model';
import { CamelCaseHelper } from './../../../../core/helper/camelCase.helper';
import { EmployeeService } from './../../../../core/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as fromEmployees from '../../store/employees.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public employeeObs$: Observable<any>;
  public employees: Employee[];
  public searchFormControl = new FormControl();
  public searchStatusFormControl = new FormControl('');
  private sortVariable = {
    sortName: '',
    sortType: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private store: Store<fromApp.AppState>,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store
      .select('employees')
      .pipe(map((val) => val.employees));
    // this.dataStorageService.storeEmployees();
    this.store.dispatch(new EmployeeActions.GetEmployees());

    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((val) => {
        let params = new HttpParams().append(
          'search',
          this.searchFormControl.value
        );

        if (this.searchStatusFormControl.value !== '')
          params = params.append('status', this.searchStatusFormControl.value);
        this.store.dispatch(new EmployeeActions.SearchEmployees(params));
      });
    this.searchStatusFormControl.valueChanges.subscribe((val) => {
      this.dataStorageService.searchEmployee(
        this.searchFormControl.value ? this.searchFormControl.value : '',
        val
      );
    });
  }

  onSort(sortName: string): void {
    this.sortVariable.sortName !== sortName
      ? this.sortVariable
      : {
          sortName,
          sortType: 'DESC',
        };
  }
}
