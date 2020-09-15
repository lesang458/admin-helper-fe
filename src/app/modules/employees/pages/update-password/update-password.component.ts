import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'ah-update-password-page',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit {
  public title = 'CHANGE_PASSWORD.TITLE';
  public isChangePassword: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isChangePassword = this.auth.isAuthenticated();
  }
}
