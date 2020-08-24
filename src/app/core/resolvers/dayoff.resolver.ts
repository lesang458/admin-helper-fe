import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as EmployeeActions from '../../modules/employees/store/employees.actions';

@Injectable({ providedIn: 'root' })
export class DayoffResolver implements Resolve<void> {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this.store.dispatch(
      new EmployeeActions.FetchDayOff({
        search: '',
        page: 1,
        sort: {
          sortNameType: 0,
          sortBirthDateType: 0,
        },
      })
    );
  }
}
