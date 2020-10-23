import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-employee-edit-page',
  templateUrl: './employee-edit-page.component.html',
})
export class EmployeeEditPageComponent implements OnInit {
  public title: string;
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {
    this.title = 'EMPLOYEE_EDIT.TITLE';
  }
}
