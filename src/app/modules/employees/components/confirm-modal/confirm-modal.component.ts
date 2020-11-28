import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchParams } from '../../store/employees.actions';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';

@Component({
  selector: 'ah-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  public id: number;
  public type: string;
  public employeeId: number;
  public params: SearchParams;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  public getTitle(): string {
    switch (this.type) {
      case 'delete':
        return this.translate.instant('CONFIRM_MODAL.DELETE_TITLE');
      case 'approve':
        return this.translate.instant('CONFIRM_MODAL.APPROVE_TITLE');
      case 'cancel':
        return this.translate.instant('CONFIRM_MODAL.CANCEL_TITLE');
      case 'deny':
        return this.translate.instant('CONFIRM_MODAL.DENY_TITLE');
    }
  }

  public getParam(): string {
    switch (this.type) {
      case 'delete':
        return this.translate.instant('CONFIRM_MODAL.DELETE_PARAM');
      case 'approve':
        return this.translate.instant('CONFIRM_MODAL.APPROVE_PARAM');
      case 'cancel':
        return this.translate.instant('CONFIRM_MODAL.CANCEL_TITLE');
      case 'deny':
        return this.translate.instant('CONFIRM_MODAL.DENY_TITLE');
    }
  }

  public onConfirm() {
    const searchParams = this.params;
    const id = this.id;
    const employeeId = this.employeeId;
    const params = { id, searchParams };
    this.bsModalRef.hide();

    switch (this.type) {
      case 'delete':
        return this.store.dispatch(
          new EmployeeActions.DeleteDayOffRequest({ ...params, employeeId })
        );
      case 'approve':
        return this.store.dispatch(
          new EmployeeActions.ApproveDayOffRequest(params)
        );
      case 'cancel':
        return this.store.dispatch(
          new EmployeeActions.CancelDayOffRequest({ ...params, employeeId })
        );
      case 'deny':
        return this.store.dispatch(
          new EmployeeActions.DenyDayOffRequest(params)
        );
    }
  }
}
