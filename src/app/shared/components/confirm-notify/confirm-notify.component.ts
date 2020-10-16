import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as DayOffActions from '../../../modules/dayoff-categories/store/dayoff-categories.actions';

@Component({
  selector: 'ah-confirm-notify',
  templateUrl: './confirm-notify.component.html',
  styleUrls: ['./confirm-notify.component.scss'],
})
export class ConfirmNotifyComponent implements OnInit {
  public type: string;
  public selectedCategory: DayOffCategory;
  constructor(
    public bsModalRef: BsModalRef,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.type === 'day-off-category-deactive') {
      this.store.dispatch(
        new DayOffActions.DeactivateDayOffCategory({
          id: this.selectedCategory.id.toString(),
        })
      );
    }
    if (this.type === 'day-off-category-active') {
      this.store.dispatch(
        new DayOffActions.ActivateDayOffCategory({
          id: this.selectedCategory.id.toString(),
        })
      );
    }
    this.bsModalRef.hide();
  }
}
