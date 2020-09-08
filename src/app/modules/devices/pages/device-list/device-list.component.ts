import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  public title = 'DEVICE_TABLE.TITLE';
  constructor() {}

  ngOnInit(): void {}
}
