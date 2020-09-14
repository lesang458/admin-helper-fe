import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ah-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  public isChangePw: boolean = !!localStorage.getItem('token');
  public disabled = true;
  public verify: number = 0;
  public updatePwForm = new FormGroup({
    email: new FormControl('', Validators.email),
    oldPassword: new FormControl('', Validators.minLength(6)),
    newPassword: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl('', Validators.minLength(6)),
    token: new FormControl(),
  });

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.updatePwForm.valueChanges.subscribe(() => {
      this.disabled = this.updatePwForm.invalid;
    });
  }

  get f() {
    return this.updatePwForm.controls;
  }

  public onSubmit(): void {
    // this.store.dispatch(new AuthActions.Login(this.loginForm.value));
  }

  public getBtnName(): string {
    return this.isChangePw || this.verify === 2
      ? this.translate.instant('CHANGE_PASSWORD.SUBMIT')
      : this.translate.instant('RESET_PASSWORD.NEXT');
  }
}
