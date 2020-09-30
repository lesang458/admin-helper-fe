import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-general-device-categories',
  templateUrl: './general-device-categories.component.html',
  styleUrls: ['./general-device-categories.component.scss'],
})
export class GeneralDeviceCategoriesComponent implements OnInit {
  public title = 'DEVICE_CATEGORIES_PAGE.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
