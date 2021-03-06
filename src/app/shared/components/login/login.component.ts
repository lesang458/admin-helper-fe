import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { RouteConstant } from '../../constants/route.constant';

@Component({
  selector: 'ah-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: SocialUser;
  public loggedIn: boolean;
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6)),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: SocialAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.store.dispatch(new AuthActions.Login(this.loginForm.value));
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      this.store.dispatch(
        new AuthActions.LoginByEmail({ idToken: res?.idToken })
      );
    });
  }

  public onNavigateToResetPage(): void {
    this.router.navigateByUrl(`/${RouteConstant.resetPassword}`);
  }
}
