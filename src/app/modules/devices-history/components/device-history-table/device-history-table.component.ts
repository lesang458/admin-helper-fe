import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DevicesHistoryActions from '../../store/devices-history.actions';
import * as DevicesActions from '../../../devices/store/devices.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceHistory } from 'src/app/shared/models/devices-history.model';
import { map } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/models/pagination.model';
import { FormControl } from '@angular/forms';
import { State } from 'src/app/modules/devices/store/devices.reducer';
import { DeviceHistoryDetailComponent } from '../device-history-detail/device-history-detail.component';

@Component({
  selector: 'ah-device-history-table',
  templateUrl: './device-history-table.component.html',
  styleUrls: ['./device-history-table.component.scss']
})
export class DeviceHistoryTableComponent implements OnInit {
  public data$: Observable<PaginatedData<DeviceHistory[]>>;
  public categories$: Observable<State>;
  public searchStatusFormControl = new FormControl('');
  public selectedCategory = new FormControl('');
  public selectedFromDate = new FormControl('');
  public selectedToDate = new FormControl('');
  public bsModalRef: BsModalRef;  
  public currentPage = 1;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.data$ = this.store.select('deviceHistory').pipe(
      map((devices) => {
        return devices.deviceHistory;
      })
    );
    this.onPageChanged(1);
    this.categories$ = this.store.select('devices')
    this.store.dispatch(new DevicesActions.FetchDeviceCategories());
    this.selectedCategory.valueChanges.subscribe(() => {
      this.onDataChanged();
    });

    this.searchStatusFormControl.valueChanges.subscribe(() => {
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
    if (this.currentPage === 1) {
      this.onPageChanged(1);
    } else {
      this.currentPage = 1;
    }
  }

  public onPageChanged(page: number): void { 
     const status = this.searchStatusFormControl.value;
     const deviceCategoryId= this.selectedCategory.value;
     const historyFrom= this.selectedFromDate.value;
     const historyTo= this.selectedToDate.value;
     const params = {
       page, 
       perPage: 10, 
       status, 
       deviceCategoryId,
       historyFrom,
       historyTo
      }
     this.store.dispatch(new DevicesHistoryActions.FetchDeviceHistory(params));

}

  public openModalWithComponent(id: number): void {
    const initialState = { id };
    this.bsModalRef = this.modalService.show(DeviceHistoryDetailComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
