import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { SearchParams } from '../../store/employees.actions';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  public employeeObs$: Observable<any>;
  public searchFormControl = new FormControl('');
  public currentPage = 1;
  public searchStatusFormControl = new FormControl('');
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public sortJoinDateType = 0;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.employeeObs$ = this.store.select('employees');
    this.onPageChanged(1);

    this.searchFormControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });

    this.searchStatusFormControl.valueChanges.subscribe(() => {
      if (this.currentPage === 1) {
        this.onPageChanged(1);
      } else {
        this.currentPage = 1;
      }
    });
  }

  public onSort(page: number, column: string): void {
    if (column === 'name') {
      this.sortNameType =
        this.sortNameType === 0 ? 1 : this.sortNameType === 1 ? 2 : 1;
      this.sortBirthDateType = 0;
      this.sortJoinDateType = 0;
    } else if (column === 'birthdate') {
      this.sortBirthDateType =
        this.sortBirthDateType === 0 ? 1 : this.sortBirthDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
      this.sortJoinDateType = 0;
    } else {
      this.sortJoinDateType =
        this.sortJoinDateType === 0 ? 1 : this.sortJoinDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
      this.sortBirthDateType = 0;
    }
    this.onPageChanged(page);
  }

  public onPageChanged(page: number): void {
    const search = this.searchFormControl.value;
    const status = this.searchStatusFormControl.value;
    const searchParams: SearchParams = {
      search,
      page,
      sort: {
        sortNameType: this.sortNameType,
        sortBirthDateType: this.sortBirthDateType,
        sortJoinDateType: this.sortJoinDateType,
      },
      status,
    };
    this.store.dispatch(new EmployeeActions.SearchEmployees(searchParams));
  }
}
