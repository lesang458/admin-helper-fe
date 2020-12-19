import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-payroll-page',
  templateUrl: './payroll-page.component.html',
  styleUrls: ['./payroll-page.component.scss'],
})
export class PayrollPageComponent implements OnInit {
  public title = 'PAYROLL.TITLE';
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}
}
