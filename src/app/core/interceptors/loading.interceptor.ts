import { TitleService } from './../services/title.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private titleService: TitleService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.titleService.isShowLoading.next(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.titleService.isShowLoading.next(false);
        }
        return 0;
      })
    );
  }
}
