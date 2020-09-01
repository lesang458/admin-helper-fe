import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as fromApp from '../../../../store/app.reducer';
import * as DayOffActions from '../../store/dayoff-categories.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DayoffCreateEditCategoriesComponent } from '../dayoff-categories-create-edit/dayoff-create-edit.component';
import { DayOff } from 'src/app/shared/models/dayoff.model';

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
    this.store.dispatch(new DayOffActions.FetchDayOff());
    this.data$ = this.store.select('dayoff');
  }

  public openModalWithComponent(dayoffSelected?: DayOff, type?: string) {
    const initialState = { dayoffSelected, type };
    this.bsModalRef = this.modalService.show(
      DayoffCreateEditCategoriesComponent,
      {
        initialState,
      }
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
