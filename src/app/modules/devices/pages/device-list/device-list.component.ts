import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  public title = 'DEVICE_TABLE.TITLE';
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.changeTitle('TITLE_FOR_PAGES.DEVICE_LIST');
  }
}
