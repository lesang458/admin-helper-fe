import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../store/employees.actions';
import * as DayOffCategoriesActions from 'src/app/modules/dayoff-categories/store/dayoff-categories.actions';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { SearchParams } from 'src/app/modules/employees/store/employees.actions';

@Component({
  selector: 'ah-dayoff-request-list',
  templateUrl: './dayoff-request-list.component.html',
  styleUrls: ['./dayoff-request-list.component.scss'],
})
export class DayOffRequestListComponent implements OnInit {
  public searchInput = new FormControl('');
  public selectedType = new FormControl('');
  public selectedFromDate = new FormControl('');
  public selectedToDate = new FormControl('');
  public validToDate: string;
  public validFromDate: string;
  public currentPage = 1;
  public data$: Observable<any>;
  public types$: Observable<DayOffCategory[]>;
  public bsModalRef: BsModalRef;
  public searchParams: SearchParams;
  public editData: any;
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees');
    this.types$ = this.store.select('dayoffCategories').pipe(
      tap((data) => {
        if (data.dayoff.length) {
          this.selectedType.patchValue('');
        }
      }),
      map((data) => {
        return data.dayoff;
      })
    );
    this.store.dispatch(
      new DayOffCategoriesActions.FetchDayOffCategories({ status: '' })
    );
    this.selectedType.valueChanges.subscribe(() => {
      this.onDataChanged();
    });
    this.selectedFromDate.valueChanges.subscribe(() => {
      this.onDataChanged();
    });

    this.selectedToDate.valueChanges.subscribe(() => {
      this.onDataChanged();
    });
  }

  public onDataChanged(): void {
    this.currentPage === 1 ? this.onPageChanged(1) : (this.currentPage = 1);
  }

  public onPageChanged(page: number): void {
    const dayOffCategoryId = this.selectedType.value;
    this.validToDate = this.selectedFromDate.value;
    this.validFromDate = this.selectedToDate.value;
    const fromDate = this.validToDate;
    const toDate = this.validFromDate;
    this.searchParams = {
      page,
      perPage: 10,
      dayOffCategoryId,
      fromDate,
      toDate,
    };
    this.store.dispatch(
      new EmployeeActions.FetchDayOffRequest(this.searchParams)
    );
  }

  public navigateEmployeeDetail(id): void {
    this.router.navigateByUrl(`/${RouteConstant.employees}/${id}`);
  }

  public openModalWithComponent(): void {}
}
