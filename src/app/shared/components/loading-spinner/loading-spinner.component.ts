import { TitleService } from './../../../core/services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
