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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notifyService: NotifyService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.status === 201) {
            this.notifyService.success('Created successfully!');
          }
        }
      }),
      catchError((err) => {
        const error = err.error.message || err.statusText;
        this.notifyService.error(error);
        return throwError(error);
      })
    );
  }
}
