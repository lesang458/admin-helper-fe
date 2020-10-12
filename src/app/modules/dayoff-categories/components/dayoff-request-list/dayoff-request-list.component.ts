import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-dayoff-request-list',
  templateUrl: './dayoff-request-list.component.html',
  styleUrls: ['./dayoff-request-list.component.scss'],
})
export class DayOffRequestListComponent implements OnInit {
  public title = 'DAY_OFF_REQUEST_PAGE.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
