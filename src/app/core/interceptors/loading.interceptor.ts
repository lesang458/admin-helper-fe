import { TitleService } from './../services/title.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  public modalRef: BsModalRef;
  private totalRequests = 0;

  constructor(
    private modalService: BsModalService,
    private titleService: TitleService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    this.titleService.isShowLoading.next(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.titleService.isShowLoading.next(true);
        }
        return 0;
      })
    );
  }
}
