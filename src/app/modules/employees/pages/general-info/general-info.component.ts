import { TitleService } from './../../../../core/services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  public title = 'GENERAL_LIST.TITLE';
  constructor(private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.changeTitle('TITLE_FOR_PAGES.GENERAL_INFO');
  }
}
