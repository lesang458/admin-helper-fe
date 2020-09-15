import { Injectable } from '@angular/core';
import { Employee } from 'src/app/shared/models/employees.model';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import * as camelcaseKeys from 'camelcase-keys';
import * as snakecaseKeys from 'snakecase-keys';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffect {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    switchMap((action: AuthActions.Login) => {
      const body = action.payload;
      return this.http.post<any>(`${environment.APILink}/login`, body).pipe(
        map((val) => {
          localStorage.setItem('token', val?.token);
          const data: Employee = camelcaseKeys(val.data);
          return new AuthActions.LoginSuccess(data);
        })
      );
    })
  );

  @Effect()
  authLoginByEmail = this.actions$.pipe(
    ofType(AuthActions.LOGIN_EMAIL),
    switchMap((action: AuthActions.LoginByEmail) => {
      const body = snakecaseKeys(action.payload);
      return this.http
        .post<any>(`${environment.APILink}/google_login`, body)
        .pipe(
          map((val) => {
            localStorage.setItem('token', val?.token);
            const data: Employee = camelcaseKeys(val.data);
            return new AuthActions.LoginSuccess(data);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/dang-nhap']);
    })
  );

  @Effect({ dispatch: false })
  authSendMail = this.actions$.pipe(
    ofType(AuthActions.SEND_MAIL),
    switchMap((action: AuthActions.SendMail) => {
      const body = snakecaseKeys(action.payload);
      return this.http.post<any>(`${environment.APILink}/password`, body).pipe(
        catchError((err) => {
          if (err !== 'OK') {
            this.auth.setResetPwHasError(true);
          } else {
            this.auth.setVerifyStep(1);
          }
          return this.auth.currentResetPwHasError;
        })
      );
    })
  );

  @Effect({ dispatch: false })
  authVerifyToken = this.actions$.pipe(
    ofType(AuthActions.VERIFY_TOKEN),
    switchMap((action: AuthActions.VerifyToken) => {
      const body = snakecaseKeys(action.payload);
      return this.http
        .post<any>(`${environment.APILink}/password/validate_token`, body)
        .pipe(
          map(() => {
            this.auth.setVerifyStep(2);
          }),
          catchError(() => {
            this.auth.setResetPwHasError(true);
            return this.auth.currentResetPwHasError;
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authResetPassword = this.actions$.pipe(
    ofType(AuthActions.RESET_PASSWORD),
    switchMap((action: AuthActions.ResetPassword) => {
      const body = snakecaseKeys(action.payload);
      console.log(body);

      return this.http
        .post<any>(`${environment.APILink}/password/check_token`, body)
        .pipe(
          map(() => {
            this.router.navigate(['/dang-nhap']);
          })
        );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}
}
