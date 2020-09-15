import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
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
    return this.browserSupportService.isIE()
      ? this.router.createUrlTree(['not-supported-ie'])
      : this.auth.isAuthenticated()
      ? route.routeConfig.path === 'dang-nhap'
        ? this.router.createUrlTree([''])
        : route.routeConfig.path === 'khoi-phuc-mat-khau'
        ? this.router.createUrlTree([''])
        : true
      : route.routeConfig.path === 'dang-nhap' ||
        route.routeConfig.path === 'khoi-phuc-mat-khau'
      ? true
      : this.router.createUrlTree(['dang-nhap']);
  }
}
