import { DayOffCategoryEditComponent } from './../dayoff-category-edit/dayoff-category-edit.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DayOffActions from '../../store/dayoff-categories.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';
import { ConfirmNotifyComponent } from 'src/app/shared/components/confirm-notify/confirm-notify.component';

@Component({
  selector: 'ah-dayoff-list',
  templateUrl: './dayoff-categories-list.component.html',
  styleUrls: ['./dayoff-categories-list.component.scss'],
})
export class DayOffCategoriesListComponent implements OnInit {
  public searchInput = new FormControl('');
  public data$: Observable<any>;
  public bsModalRef: BsModalRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      new DayOffActions.FetchDayOffCategories({ status: '' })
    );
    this.data$ = this.store.select('dayoffCategories');
  }

  public openModalWithComponent(
    selectedCategory?: DayOffCategory,
    type?: string
  ): void {
    const initialState = { selectedCategory, type };
    if (type === 'edit') {
      this.bsModalRef = this.modalService.show(DayOffCategoryEditComponent, {
        initialState,
      });
    } else {
      this.bsModalRef = this.modalService.show(ConfirmNotifyComponent, {
        initialState,
      });
    }
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
