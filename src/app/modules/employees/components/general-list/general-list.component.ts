import { EmployeeService } from './../../../../core/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  }

  onSearch() {
    this.employeeObs$ = this.employeeService.searchEmployee(
      this.searchFormControl.value ? this.searchFormControl.value : '',
      this.searchStatusFormControl.value
        ? this.searchStatusFormControl.value
        : ''
    );
  }

  toCamel(s: string) {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  keysToCamel(o: any) {
    if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n = {};
      Object.keys(o).forEach((k) => {
        n[this.toCamel(k)] = this.keysToCamel(o[k]);
      });
      return n;
    } else if (Array.isArray(o)) {
      return o.map((i) => {
        return this.keysToCamel(i);
      });
    }
    return o;
  }
}
