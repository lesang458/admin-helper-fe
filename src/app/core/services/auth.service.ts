import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private verifyStep = new BehaviorSubject<number>(0);
  public currentVerifyStep = this.verifyStep.asObservable();
  private resetPwHasError = new BehaviorSubject<boolean>(false);
  public currentResetPwHasError = this.resetPwHasError.asObservable();
  constructor(public jwtHelper: JwtHelperService) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  public setVerifyStep(isVerify: number): void {
    this.verifyStep.next(isVerify);
  }

  public setResetPwHasError(hasError: boolean): void {
    this.resetPwHasError.next(hasError);
  }

  public getCurrentVerifyStep(): number {
    return this.verifyStep.value;
  }
}
