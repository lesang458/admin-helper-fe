import * as fromApp from '../../../../store/app.reducer';
import * as DayOffActions from './../../store/dayoff.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'ah-dayoff-list',
  templateUrl: './dayoff-list.component.html',
  styleUrls: ['./dayoff-list.component.scss'],
})
export class DayOffListComponent implements OnInit {
  public searchInput = new FormControl('');
  public data$: Observable<any>;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new DayOffActions.FetchDayOff());
    this.data$ = this.store.select('dayoff');
  }
}
