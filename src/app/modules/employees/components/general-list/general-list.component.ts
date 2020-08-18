import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ah-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  employeeObs$: Observable<any>;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeObs$ = this.employeeService.getAllEmployee();
  }
}
