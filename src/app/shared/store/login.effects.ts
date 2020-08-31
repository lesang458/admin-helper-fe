import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as LoginAction from './login.actions';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';

@Injectable()
export class LoginEffect {
  @Effect()
  login = this.actions$.pipe(
    ofType(LoginAction.LOGIN),
    switchMap((action: LoginAction.Login) => {
      const body = action.payload;
      return this.http.post<any>(`${environment.APILink}/login`, body).pipe(
        map((val) => {
          localStorage.setItem('token', val?.token);
          const data: Employee = camelcaseKeys(val.data);
          return new LoginAction.LoginSuccess(data);
        })
      );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
