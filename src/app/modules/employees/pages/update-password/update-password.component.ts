import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ah-update-password-page',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit {
  public title = 'CHANGE_PASSWORD.TITLE';
  public isChangePassword = !!localStorage.getItem('token');

  constructor() {}

  ngOnInit(): void {}
}
