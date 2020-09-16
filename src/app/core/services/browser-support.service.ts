import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class BrowserSupportService {
  constructor(public jwtHelper: JwtHelperService) {}

  public isIE(): boolean {
    const ua = navigator.userAgent;
    return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
  }
}
