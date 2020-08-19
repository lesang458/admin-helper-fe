import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CamelCaseHelper } from '../core/helper/camelCase.helper';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as employeeActions from '../modules/employees/store/employees.actions';
import { Employee } from './models/employees.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  public storeEmployees() {
    // return this.http
    //   .get<Employee[]>(environment.APILink, {
    //     headers: {
    //       Authorization: localStorage.getItem('token'),
    //     },
    //   })
    //   .pipe(
    //     map((val) => {
    //       return CamelCaseHelper.keysToCamel(val);
    //     }),
    //     tap((val: any) => {
    //       this.store.dispatch(new employeeActions.GetEmployees(val.data));
    //     })
    //   )
    //   .subscribe();
  }

  public searchEmployee(searchStr: string, status: string) {
    // let params = new HttpParams().append('search', searchStr);
    // if (status !== '') params = params.append('status', status);
    // return this.http
    //   .get<any>(`${environment.APILink}`, {
    //     headers: {
    //       Authorization: localStorage.getItem('token'),
    //     },
    //     params: params,
    //   })
    //   .pipe(
    //     map((val) => {
    //       return CamelCaseHelper.keysToCamel(val);
    //     }),
    //     tap((val: any) => {
    //       this.store.dispatch(new employeeActions.GetEmployees(val.data));
    //     })
    //   )
    //   .subscribe();
  }
}
