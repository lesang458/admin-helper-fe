import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Employee } from 'src/app/shared/models/employees.model';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { SearchParams } from '../../store/employees.actions';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ah-dayoff-table',
  templateUrl: './dayoff-table.component.html',
  styleUrls: ['./dayoff-table.component.scss'],
})
export class DayoffTableComponent implements OnInit, OnDestroy {
  public searchInput = new FormControl('');
  public selectedType = new FormControl('VACATION');
  public currentPage = 1;
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public selectedEmployee: Employee;
  public searchParams = {
    search: '',
    page: 1,
    perPage: 10,
    sort: {
      sortNameType: 0,
      sortBirthDateType: 0,
      sortJoinDateType: 0,
    },
    status: 'ACTIVE',
  };
  public data$: Observable<PaginatedData<Employee[]>>;
  private subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees').pipe(
      map((employees) => {
        return employees.dayOff;
      })
    );

    this.subscription = this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        if (this.currentPage === 1) {
          this.onPageChanged(1);
        } else {
          this.currentPage = 1;
        }
      });
  }

  public onSort(page: number, column?: string): void {
    if (column) {
      this.sortNameType =
        this.sortNameType === 0 ? 1 : this.sortNameType === 1 ? 2 : 1;
      this.sortBirthDateType = 0;
    } else {
      this.sortBirthDateType =
        this.sortBirthDateType === 0 ? 1 : this.sortBirthDateType === 1 ? 2 : 1;
      this.sortNameType = 0;
    }
    this.onPageChanged(page);
  }

  public onPageChanged(page: number): void {
    const search = this.searchInput.value;
    this.searchParams = {
      search,
      page,
      perPage: 10,
      sort: {
        sortNameType: this.sortNameType,
        sortBirthDateType: this.sortBirthDateType,
        sortJoinDateType: 0,
      },
      status: 'ACTIVE',
    };
    this.store.dispatch(new EmployeeActions.FetchDayOff(this.searchParams));
  }

  public getTotalLeaves(dayOffInfos: any, type: string): number {
    if (dayOffInfos) {
      const item = dayOffInfos.find((t) => t.categoryName === type);
      return item ? item.hours / 8 : 0;
    }
    return 0;
  }

  public getTotalLeavesRemaining(dayOffInfos: any, type: string): number {
    if (dayOffInfos) {
      const item = dayOffInfos.find((t) => t.categoryName === type);
      return item ? item.availableHours / 8 : 0;
    }
    return 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
