import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DevicesHistoryActions from '../../store/devices-history.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayOffCategory } from 'src/app/shared/models/dayoff-category.model';

@Component({
  selector: 'ah-device-history-table',
  templateUrl: './device-history-table.component.html',
})
export class DeviceHistoryTableComponet implements OnInit {
  public searchInput = new FormControl('');
  public data$: Observable<any>;
  public bsModalRef: BsModalRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DevicesHistoryActions.FetchDeviceHistory());
    console.log('jksjfslfj');
    this.data$ = this.store.select('deviceHistory');
    console.log('DeviceHistoryTableComponet -> ngOnInit -> data', this.data$);
  }

  public openModalWithComponent(
    selectedCategory?: DayOffCategory,
    type?: string
  ): void {
    // const initialState = { selectedCategory, type };
    // this.bsModalRef = this.modalService.show(DayOffCategoryEditComponent, {
    //   initialState,
    // });
    // this.bsModalRef.content.closeBtnName = 'Close';
  }
}
