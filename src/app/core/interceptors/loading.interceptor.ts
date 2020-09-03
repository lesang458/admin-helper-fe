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

  constructor(private modalService: BsModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.totalRequests === 0) {
      this.modalRef = this.modalService.show(LoadingSpinnerComponent);
    }
    this.totalRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.modalRef.hide();
        }
        return 0;
      })
    );
  }
}
