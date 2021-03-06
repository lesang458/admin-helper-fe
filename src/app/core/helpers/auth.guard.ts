import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { AuthService } from '../services/auth.service';
import { BrowserSupportService } from '../services/browser-support.service';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    public auth: AuthService,
    public router: Router,
    private browserSupportService: BrowserSupportService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.browserSupportService.isIE()) {
      return this.router.createUrlTree([RouteConstant.notSupported]);
    }
    const checkUrlLogin = route.routeConfig.path === RouteConstant.login;
    const checkUrlReset =
      route.routeConfig.path === RouteConstant.resetPassword;
    if (this.auth.isAuthenticated() && (checkUrlLogin || checkUrlReset)) {
      return this.router.createUrlTree([RouteConstant.employees]);
    }
    if (!this.auth.isAuthenticated() && !(checkUrlLogin || checkUrlReset)) {
      return this.router.createUrlTree([RouteConstant.login]);
    }
    return true;
  }
}
