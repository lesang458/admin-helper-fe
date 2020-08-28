import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DayOffActions from './../../store/dayoff.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayoffCreateEditComponent } from '../dayoff-create-edit/dayoff-create-edit.component';
import { DayOff } from 'src/app/shared/models/dayoff.model';

@Component({
  selector: 'ah-dayoff-list',
  templateUrl: './dayoff-list.component.html',
  styleUrls: ['./dayoff-list.component.scss'],
})
export class DayOffListComponent implements OnInit {
  public searchInput = new FormControl('');
  public data$: Observable<any>;
  public bsModalRef: BsModalRef;
  constructor(
    private store: Store<fromApp.AppState>,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new DayOffActions.FetchDayOff());
    this.data$ = this.store.select('dayoff');
  }

  public openModalWithComponent(dayoffSelected?: DayOff, type?: string) {
    const initialState = { dayoffSelected, type };
    this.bsModalRef = this.modalService.show(DayoffCreateEditComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
