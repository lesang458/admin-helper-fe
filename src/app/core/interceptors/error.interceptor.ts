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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService, private router: Router) {}

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
        }
      }),
      catchError((err) => {
        const error = err?.error?.message || err?.statusText;
        if (
          error === 'User authentication failed' ||
          error === 'You seem to have an expired token'
        ) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        this.notifyService.error(error);

        return throwError(error);
      })
    );
  }
}
