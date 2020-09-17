import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { $ } from 'protractor';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  public showSuccess(message: string): void {
    this.toastr.success(null, message);
  }

  public showError(message: string): void {
    if (message === 'Validation failed: Email has already been taken') {
      message = this.translate.instant('PROFILE_CREATE.MESS_EMAIL');
    }
    if (message === `Couldn't find User`) {
      message = this.translate.instant('MESSAGE.NO_USER');
    }
    if (message === 'You seem to have an expired token') {
      message = this.translate.instant('MESSAGE.NO_TOKEN');
    }
    if (message === 'Invalid email or password') {
      message = this.translate.instant('MESSAGE.NO_ACC');
    }
    if (message === 'Invalid User') {
      message = this.translate.instant('MESSAGE.WRONG_ACC');
    }
    this.toastr.error(null, message);
  }
}
