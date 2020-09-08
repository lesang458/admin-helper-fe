import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-device-history-list',
  templateUrl: './device-history-list.component.html',
})
export class DeviceHistoryListComponent implements OnInit {
  public title = 'DEVICE_HISTORY.TITLE';
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.changeTitle('TITLE_FOR_PAGES.DEVICE_HISTORY');
  }
}
