import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.auth.isAuthenticated()
      ? route.routeConfig.path === 'login'
        ? this.router.createUrlTree([''])
        : route.routeConfig.path === 'reset-password'
        ? this.router.createUrlTree([''])
        : true
      : route.routeConfig.path === 'login'
      ? true
      : this.router.createUrlTree(['login']);
  }
}
