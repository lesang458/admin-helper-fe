import { TitleService } from './../../../core/services/title.service';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouteConstant } from '../../constants/route.constant';

@Component({
  selector: 'ah-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  public userName = localStorage.getItem('userName');
  constructor(
    public translate: TranslateService,
    private store: Store<fromApp.AppState>,
    private titleService: Title,
    private titleSv: TitleService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public switchLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.titleService.setTitle(
      `AH | ${this.translate.instant(this.titleSv.i18nKey)}`
    );
  }

  public logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }

  public changePassword(): void {
    this.router.navigateByUrl(`/${RouteConstant.changePassword}`);
  }
}
