import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'ah-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(public titleService: TitleService) {}

  ngOnInit(): void {}

  public isAdmin(): boolean {
    const roles = localStorage.getItem('roles');
    return roles.includes('ADMIN');
  }
}
