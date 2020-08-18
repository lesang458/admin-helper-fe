import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  employeeObs$: Observable<any>;
  searchFormControl = new FormControl();
  searchStatusFormControl = new FormControl('');

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeObs$ = this.employeeService.getAllEmployee();
    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((val) => {
        this.employeeObs$ = this.employeeService.searchEmployee(
          val,
          this.searchStatusFormControl.value
            ? this.searchStatusFormControl.value
            : ''
        );
      });
    this.searchStatusFormControl.valueChanges.subscribe((val) => {
      this.employeeObs$ = this.employeeService.searchEmployee(
        this.searchFormControl.value ? this.searchFormControl.value : '',
        val
      );
    });
    console.log(this.searchStatusFormControl);
  }

  onSearch() {
    this.employeeObs$ = this.employeeService.searchEmployee(
      this.searchFormControl.value ? this.searchFormControl.value : '',
      this.searchStatusFormControl.value
        ? this.searchStatusFormControl.value
        : ''
    );
  }

  underlineToCamelCase(string) {
    return string.replace(/(\_[a-z])/g, function (match) {
      return match.toUpperCase().replace('_', '');
    });
  }

  convertToCamelCaseObject(object) {
    if (typeof object != 'object') return object;

    return Object.keys(object).reduce(function (newObject, key) {
      var newKey = this.underlineToCamelCase(key);

      if (object[key] instanceof Array) {
        newObject[newKey] = object[key].map(this.convertToCamelCaseObject);
      } else if (object[key] instanceof Object) {
        newObject[newKey] = this.convertToCamelCaseObject(object[key]);
      } else {
        newObject[newKey] = object[key];
      }

      return newObject;
    }, {});
  }
}
