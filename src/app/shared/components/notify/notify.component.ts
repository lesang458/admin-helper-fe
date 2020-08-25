import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotifyService } from '../../services/notify.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-notify',
  templateUrl: 'notify.component.html',
  styleUrls: ['notify.component.scss'],
})
export class NotifyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public message: any;

  constructor(
    private notifyService: NotifyService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.subscription = this.notifyService.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case 'success':
          message.cssClass = 'alert-success';
          break;
        case 'error':
          message.cssClass = 'alert-danger';
          break;
      }
      switch (message && message.text) {
        case 'Validation failed: Email has already been taken':
          message.text = this.translate.instant('PROFILE_CREATE.MESS_EMAIL');
          break;
        case 'Successfully!':
          message.text = this.translate.instant('PROFILE_CREATE.MESS_SUCCESS');
          break;
      }

      this.message = message;
    });
  }

  public showMess() {
    this.message = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
