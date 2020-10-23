import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-employee-create-page',
  templateUrl: './employee-create-page.component.html',
  styleUrls: ['./employee-create-page.component.scss'],
})
export class EmployeeCreatePageComponent implements OnInit {
  public edit = location.pathname.split('/')[3] === 'edit';
  public create = location.pathname.split('/')[2] === 'create';
  public title: string;
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {
    if (this.edit) {
      this.title = 'EMPLOYEE_EDIT.TITLE';
    } else if (this.create) {
      this.title = 'EMPLOYEE_CREATE.TITLE';
    } else {
      this.title = 'EMPLOYEE_DETAIL.TITLE';
    }
  }
}
