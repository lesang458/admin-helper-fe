import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'ah-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor(
    public translate: TranslateService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {}

  public switchLanguage(language: string): void {
    this.translate.use(language);
  }

  public logout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
