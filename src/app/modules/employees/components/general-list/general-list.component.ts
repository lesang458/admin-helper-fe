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
        this.store.dispatch(
          new EmployeeActions.SearchEmployees(
            new HttpParams({ fromObject: this.setParams() })
          )
        );
      });
    this.searchStatusFormControl.valueChanges.subscribe((val) => {
      this.store.dispatch(
        new EmployeeActions.SearchEmployees(
          new HttpParams({ fromObject: this.setParams() })
        )
      );
    });
  }

  setParams(): any {
    let searchValue = this.searchFormControl.value;
    let statusValue = this.searchStatusFormControl.value;
    return Object.assign(
      searchValue !== '' && searchValue ? { search: searchValue } : {},
      statusValue !== '' ? { status: statusValue } : {},
      this.sortVariable.sortName !== ''
        ? {
            sort: `${this.sortVariable.sortName}:${this.sortVariable.sortType}`,
          }
        : {}
    );
  }

  onSort(sortName: string): void {
    this.sortVariable =
      this.sortVariable.sortName !== sortName
        ? {
            sortName,
            sortType: 'DESC',
          }
        : {
            sortName,
            sortType: this.sortVariable.sortType === 'DESC' ? 'ASC' : 'DESC',
          };
    this.store.dispatch(
      new EmployeeActions.SearchEmployees(
        new HttpParams({ fromObject: this.setParams() })
      )
    );
  }
}
