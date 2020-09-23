import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { AuthService } from '../services/auth.service';
import { BrowserSupportService } from '../services/browser-support.service';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private browserSupportService: BrowserSupportService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.browserSupportService.isIE()) {
      return this.router.createUrlTree([`${RouteConstant.notSupported}`]);
    }
    if (
      this.auth.isAuthenticated() &&
      (route.routeConfig.path === `${RouteConstant.login}` ||
        route.routeConfig.path === `${RouteConstant.resetPassword}`)
    ) {
      return this.router.createUrlTree(['']);
    }
    if (
      !this.auth.isAuthenticated() &&
      !(
        route.routeConfig.path === `${RouteConstant.login}` ||
        route.routeConfig.path === `${RouteConstant.resetPassword}`
      )
    ) {
      return this.router.createUrlTree([`${RouteConstant.login}`]);
    }
    return true;
  }
}
