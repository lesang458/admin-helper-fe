import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
  public title = 'GENERAL_LIST.TITLE';
  constructor() {}

  ngOnInit(): void {}
}
