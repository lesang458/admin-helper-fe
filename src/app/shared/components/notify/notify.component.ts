import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotifyService } from '../../services/notify.service';

@Component({
  selector: 'ah-notify',
  templateUrl: 'notify.component.html',
  styleUrls: ['notify.component.scss'],
})
export class NotifyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public message: any;

  constructor(private notifyService: NotifyService) {}

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
