import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as EmployeeActions from '../../store/employees.actions';
import * as DayOffActions from '../../../dayoff-categories/store/dayoff-categories.actions';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SearchParams } from '../../store/employees.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-status-confirm',
  templateUrl: './status-confirm.component.html',
  styleUrls: ['./status-confirm.component.scss'],
})
export class StatusConfirmComponent implements OnInit {
  public id: number;
  public type: string;
  public refresh: SearchParams;
  constructor(
    private store: Store<fromApp.AppState>,
    public bsModalRef: BsModalRef,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  public getTitle(): string {
    if (this.type === 'delete') {
      return this.translate.instant('PROFILE_STATUS_CHANGE.TITLE_FORMER');
    }
    return this.translate.instant('PROFILE_STATUS_CHANGE.TITLE_ACTIVE');
  }

  public getParam(): string {
    if (this.type === 'delete') {
      return this.translate.instant('PROFILE_STATUS_CHANGE.PARAM_FORMER');
    }
    return this.translate.instant('PROFILE_STATUS_CHANGE.PARAM_ACTIVE');
  }

  public onConfirm() {
    const searchParams = this.refresh;
    const id = this.id;
    if (this.type === 'delete' || this.type === 'active') {
      const status = this.type === 'delete' ? 'FORMER' : 'ACTIVE';
      const params = { id, status, searchParams };
      this.store.dispatch(new EmployeeActions.UpdateEmployeeStatus(params));
    }
    this.bsModalRef.hide();
  }
}
