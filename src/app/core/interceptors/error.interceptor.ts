import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { NotifyService } from '../services/notify.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notify: NotifyService,
    private router: Router,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 404) {
          this.router.navigate([`/${RouteConstant.page404}`]);
        }
        if (err.status >= 500) {
          this.router.navigate([`/${RouteConstant.page5xx}`]);
        }
        const error = err?.error?.message || err?.statusText;
        if (
          error === 'User authentication failed' ||
          error === 'You seem to have an expired token'
        ) {
          localStorage.removeItem('token');
          if (this.auth.getCurrentVerifyStep() !== 1) {
            this.router.navigate([`/${RouteConstant.login}`]);
          }
        }
        this.notify.showError(error);

        return throwError(error);
      })
    );
  }
}
