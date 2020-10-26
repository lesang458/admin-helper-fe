import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-employee-create-page',
  templateUrl: './employee-create-page.component.html',
  styleUrls: ['./employee-create-page.component.scss'],
})
export class EmployeeCreatePageComponent implements OnInit {
  public title: string;
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {
    this.title = 'EMPLOYEE_CREATE.TITLE';
  }
}
