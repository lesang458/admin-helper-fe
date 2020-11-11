import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as EmployeeActions from '../../modules/employees/store/employees.actions';
import { SearchParams } from '../../modules/employees/store/employees.actions';

@Injectable({ providedIn: 'root' })
export class DayoffResolver implements Resolve<void> {
  constructor(private store: Store<fromApp.AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    const searchParams: SearchParams = {
      search: '',
      page: 1,
      perPage: 10,
      sort: {
        sortNameType: 0,
        sortBirthDateType: 0,
        sortJoinDateType: 0,
      },
      status: 'ACTIVE',
      fullInfo: 'true',
    };
    this.store.dispatch(new EmployeeActions.FetchDayOff(searchParams));
  }
}
