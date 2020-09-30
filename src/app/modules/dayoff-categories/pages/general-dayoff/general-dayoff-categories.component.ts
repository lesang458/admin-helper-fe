import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-general-dayoff',
  templateUrl: './general-dayoff-categories.component.html',
  styleUrls: ['./general-dayoff-categories.component.scss'],
})
export class GeneralDayOffCategoriesComponent implements OnInit {
  public title = 'DAY_OFF_CATEGORIES_PAGE.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
