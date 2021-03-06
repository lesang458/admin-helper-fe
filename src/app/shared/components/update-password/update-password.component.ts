import { TranslateService } from '@ngx-translate/core';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { RouteConstant } from '../../constants/route.constant';

@Component({
  selector: 'ah-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit, AfterViewChecked {
  public isChangePw: boolean;
  public disabled = true;
  public verify = 0;
  private email: string;
  private token: string;
  private newPassword: string;
  public updatePwForm = new FormGroup({
    email: new FormControl('', Validators.email),
    oldPassword: new FormControl('', Validators.minLength(6)),
    newPassword: new FormControl('', Validators.minLength(6)),
    confirmPassword: new FormControl('', Validators.minLength(6)),
    token: new FormControl(),
  });

  constructor(
    private translate: TranslateService,
    private store: Store<fromApp.AppState>,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url && val.url !== `/${RouteConstant.resetPassword}`) {
        auth.setVerifyStep(0);
      }
    });
  }

  ngOnInit(): void {
    this.auth.currentVerifyStep.subscribe((val) => {
      this.verify = val;
      this.disabled = true;
    });
    this.isChangePw = this.auth.isAuthenticated();
    this.updatePwForm.valueChanges.subscribe(() => {
      this.disabled = this.updatePwForm.invalid;
    });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  get f() {
    return this.updatePwForm.controls;
  }

  public onSubmit(): void {
    if (this.isChangePw) {
      this.store.dispatch(
        new AuthActions.ChangePassword({
          oldPassword: this.updatePwForm.get('oldPassword')?.value,
          newPassword: this.updatePwForm.get('newPassword')?.value,
        })
      );
    } else {
      this.email = this.updatePwForm.get('email')?.value;
      this.token = this.updatePwForm.get('token')?.value;
      this.newPassword = this.updatePwForm.get('newPassword')?.value;
      switch (this.verify) {
        case 0:
          this.store.dispatch(
            new AuthActions.SendMail({
              email: this.email,
            })
          );
          break;
        case 1:
          this.store.dispatch(
            new AuthActions.VerifyToken({
              email: this.email,
              token: this.token.toString(),
            })
          );
          this.verify === 1 ? this.updatePwForm.setErrors(null) : null;
          break;
        case 2:
          this.store.dispatch(
            new AuthActions.ResetPassword({
              email: this.email,
              token: this.token.toString(),
              newPassword: this.newPassword,
            })
          );
          break;
        default:
          break;
      }
    }
  }

  public passwordIsIncorrect(): boolean {
    const statusValidate = (
      this.f.newPassword.value !== this.f.confirmPassword.value
    );
    if (statusValidate) {
      this.f.confirmPassword.setErrors({ incorrect:  true });
    } else {
      this.f.confirmPassword.setErrors({ incorrect: null});
      this.f.confirmPassword.updateValueAndValidity();
    }
    return statusValidate;
  }

  public getBtnName(): string {
    return this.isChangePw || this.verify === 2
      ? this.translate.instant('CHANGE_PASSWORD.SUBMIT')
      : this.translate.instant('RESET_PASSWORD.NEXT');
  }

  public getErrorMessage(): string {
    if (this.f.confirmPassword.errors?.required) {
      return this.translate.instant('PROFILE_CREATE.PASSWORD_INVALID');
    }
    if (this.passwordIsIncorrect()) {
      return this.translate.instant('RESET_PASSWORD.INCORRECT');
    }
    if (this.f.confirmPassword.errors?.minlength) {
      return this.translate.instant('PROFILE_CREATE.PASS_MINLENGTH');
    }
  }

  public getTokenErrorMessage(): string {
    if (this.f.token.errors?.required) {
      return this.translate.instant('RESET_PASSWORD.TOKEN_REQUIRED');
    }
  }

  public getEmailErrorMessage(): string {
    if (this.f.email.errors.required) {
      return this.translate.instant('PROFILE_CREATE.EMAIL_INVALID');
    }
    if (this.f.email.errors.email) {
      return this.translate.instant('PROFILE_CREATE.IS_EMAIL');
    }
  }
}
