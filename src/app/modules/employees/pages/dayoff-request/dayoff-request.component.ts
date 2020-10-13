import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-dayoff-request',
  templateUrl: './dayoff-request.component.html',
  styleUrls: ['./dayoff-request.component.scss'],
})
export class DayOffRequestComponent implements OnInit {
  public title = 'DAY_OFF_REQUEST_PAGE.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
