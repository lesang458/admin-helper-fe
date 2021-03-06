import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { Employee } from 'src/app/shared/models/employees.model';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import { SearchParams } from '../../store/employees.actions';
import { FormControl } from '@angular/forms';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import * as DayOffCategoriesActions from 'src/app/modules/dayoff-categories/store/dayoff-categories.actions';
import { Router } from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RequestDayOffComponent } from '../request-day-off/request-day-off.component';

@Component({
  selector: 'ah-dayoff-table',
  templateUrl: './dayoff-table.component.html',
  styleUrls: ['./dayoff-table.component.scss'],
})
export class DayoffTableComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public searchInput = new FormControl('');
  public selectedType = new FormControl('');
  public currentPage = 1;
  public currentSearch = '';
  public sortBirthDateType = 0;
  public sortNameType = 0;
  public selectedEmployee: Employee;
  public searchParams: SearchParams = {
    search: '',
    page: 1,
    perPage: 10,
    sort: {
      sortNameType: 0,
      sortBirthDateType: 0,
      sortJoinDateType: 0,
    },
    status: 'ACTIVE',
    fullInfo: 'true',
  };
  public data$: Observable<PaginatedData<Employee[]>>;
  public types$: Observable<DayOffCategory[]>;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees').pipe(
      map((employees) => {
        return employees.dayOff;
      })
    );
    this.types$ = this.store.select('dayoffCategories').pipe(
      tap((data) => {
        if (data.dayoff.length) {
          this.selectedType.patchValue(data.dayoff[0].name);
        }
      }),
      map((data) => {
        return data.dayoff;
      })
    );
    this.store.dispatch(
      new DayOffCategoriesActions.FetchDayOffCategories({ status: '' })
    );
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
      fullInfo: 'true',
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

  public navigateToDetailPage(id: number): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${id}?dayoff=true`);
  }

  public navigateToEditPage(id: number): void {
    this.router.navigateByUrl(
      `/${RouteConstant.employees}/${id}/edit?dayoff=true`
    );
  }

  public onSearchSubmit(): void {
    if (this.currentSearch !== this.searchInput.value.replace(/\s/g, '')) {
      this.currentSearch = this.searchInput.value.replace(/\s/g, '');
      this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
    }
  }

  public openModalWithComponent(selectedEmployee, searchParams): void {
    const initialState = { selectedEmployee, searchParams };
    this.bsModalRef = this.modalService.show(RequestDayOffComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
