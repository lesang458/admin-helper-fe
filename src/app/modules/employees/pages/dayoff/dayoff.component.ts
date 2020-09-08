import { TitleService } from './../../../../core/services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-dayoff',
  templateUrl: './dayoff.component.html',
  styleUrls: ['./dayoff.component.scss'],
})
export class DayoffComponent implements OnInit {
  public title = 'DAY_OFF_TABLE.TITLE';
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.changeTitle('TITLE_FOR_PAGES.DAY_OFF');
  }
}
