import { BrowserSupportService } from './../services/browser-support.service';
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
@Injectable({ providedIn: 'root' })
export class BrowserSupportGuardService implements CanActivate {
  constructor(
    public router: Router,
    private broserSupportService: BrowserSupportService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.broserSupportService.isIE()
      ? true
      : this.router.createUrlTree(['']);
  }
}
