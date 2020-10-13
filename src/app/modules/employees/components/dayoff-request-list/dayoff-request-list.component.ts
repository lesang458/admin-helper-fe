import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as EmployeeActions from '../../store/employees.actions';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { ConfirmNotifyComponent } from 'src/app/shared/components/confirm-notify/confirm-notify.component';
import { SearchParams } from 'src/app/modules/devices-history/store/devices-history.actions';

@Component({
  selector: 'ah-dayoff-request-list',
  templateUrl: './dayoff-request-list.component.html',
  styleUrls: ['./dayoff-request-list.component.scss'],
})
export class DayOffRequestListComponent implements OnInit {
  public searchInput = new FormControl('');
  public data$: Observable<any>;
  public bsModalRef: BsModalRef;
  public searchParams: SearchParams;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('employees');
    console.log(
      'DayOffRequestListComponent -> ngOnInit -> this.data$',
      this.data$
    );
    this.onPageChanged(1);
  }

  public onPageChanged(page: number): void {
    // const search = this.searchFormControl.value;
    // const status = this.searchStatusFormControl.value;
    this.searchParams = {
      page,
      perPage: 10,
      // sort: {
      //   sortNameType: this.sortNameType,
      //   sortBirthDateType: this.sortBirthDateType,
      //   sortJoinDateType: this.sortJoinDateType,
      // },
      // status,
    };
    this.store.dispatch(
      new EmployeeActions.FetchDayOffRequest(this.searchParams)
    );
  }

  public openModalWithComponent(): void {}
}
