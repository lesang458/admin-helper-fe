import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { RouteConstant } from 'src/app/shared/constants/route.constant';
import { DevicesHistoryService } from '../services/devices-history.service';

@Injectable({ providedIn: 'root' })
export class DevicesHistoryGuardService implements CanActivate {
  constructor(
    public devicesHistoryService: DevicesHistoryService,
    public router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.devicesHistoryService.isSelected()
      ? true
      : this.router.createUrlTree([`${RouteConstant.devices}`]);
  }
}
