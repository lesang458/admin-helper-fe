import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  public edit = location.pathname.split('/')[3] === 'edit';
  public create = location.pathname.split('/employees/')[1] === 'create';
  public title: string;
  constructor() {}

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
