import { CamelCaseHelper } from './../../../../core/helper/camelCase.helper';
import { EmployeeService } from './../../../../core/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl();
  public searchStatusFormControl = new FormControl('');
  // public keysToCamel = CamelCaseHepler.keysToCamel;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeObs$ = this.employeeService.getAllEmployee().pipe(
      map((val) => {
        return CamelCaseHelper.keysToCamel(val);
      })
    );
    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((val) => {
        this.employeeObs$ = this.employeeService
          .searchEmployee(
            val,
            this.searchStatusFormControl.value
              ? this.searchStatusFormControl.value
              : ''
          )
          .pipe(
            map((val) => {
              return CamelCaseHelper.keysToCamel(val);
            })
          );
      });
    this.searchStatusFormControl.valueChanges.subscribe((val) => {
      this.employeeObs$ = this.employeeService
        .searchEmployee(
          this.searchFormControl.value ? this.searchFormControl.value : '',
          val
        )
        .pipe(
          map((val) => {
            return CamelCaseHelper.keysToCamel(val);
          })
        );
    });
  }
}
