import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouteConstant } from 'src/app/shared/constants/route.constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notifyService: NotifyService,
    private router: Router,
    private auth: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status === 201) {
            this.notifyService.success('Successfully!');
          }
          if (evt.status >= 500) {
            this.router.navigate([`/${RouteConstant.page5xx}`]);
          }
        }
      }),
      catchError((err) => {
        const error = err?.error?.message || err?.statusText;
        if (
          error === 'User authentication failed' ||
          error === 'You seem to have an expired token'
        ) {
          localStorage.removeItem('token');
          this.auth.getCurrentVerifyStep() !== 1
            ? this.router.navigate([`/${RouteConstant.login}`])
            : null;
        }
        this.notifyService.error(error);

        return throwError(error);
      })
    );
  }
}
