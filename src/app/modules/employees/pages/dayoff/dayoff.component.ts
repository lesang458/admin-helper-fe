import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss'],
})
export class DayoffComponent implements OnInit {
  public title = 'DAY_OFF_TABLE.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
