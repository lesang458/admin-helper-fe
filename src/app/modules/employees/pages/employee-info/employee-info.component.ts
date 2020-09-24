import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  public title = 'EMPLOYEE_DETAIL.TITLE';
  constructor() {}

  ngOnInit(): void {}
}
