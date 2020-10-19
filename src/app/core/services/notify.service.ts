import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class NotifyService {
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  public showSuccess(message: string): void {
    this.toastr.success(null, this.translate.instant(message));
  }

  public showError(message: string): void {
    switch (message) {
      case 'Validation failed: Email has already been taken':
        message = this.translate.instant('PROFILE_CREATE.MESS_EMAIL');
        break;
      case `Couldn't find User`:
        message = this.translate.instant('MESSAGE.NO_USER');
        break;
      case 'You seem to have an expired token':
        message = this.translate.instant('MESSAGE.NO_TOKEN');
        break;
      case 'Invalid email or password':
        message = this.translate.instant('MESSAGE.NO_ACC');
        break;
      case 'Invalid User':
        message = this.translate.instant('MESSAGE.WRONG_ACC');
        break;
      case 'You have not permission':
        message = this.translate.instant('MESSAGE.PERMISSION');
        break;
      case 'Request is too long':
        message = this.translate.instant('MESSAGE.REQUEST_LONG');
        break;
      case 'Validation failed: Status is not valid':
        message = this.translate.instant('MESSAGE.STATUS');
        break;
      case 'Internal Server Error':
        message = this.translate.instant('MESSAGE.SERVER_ERROR');
        break;
      case 'Your password was incorrect.':
        message = this.translate.instant('MESSAGE.PASSWORD_INCORRECT');
        break;
      case 'Validation failed: Day off category inactivated':
        message = this.translate.instant('MESSAGE.DAY_OFF_CATEGORY_IS_INACTIVED');
    }
    if (message.includes(`Couldn't find User with`)) {
      message =
        this.translate.instant('MESSAGE.NO_USER') +
        message.split(`Couldn't find User with`)[1];
    }
    this.toastr.error(null, message);
  }
}
