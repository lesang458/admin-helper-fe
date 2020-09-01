import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ah-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-helper-fe';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
    localStorage.setItem(
      'token',
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJyb2xlcyI6WyJFTVBMT1lFRSIsIkFETUlOIl0sImV4cCI6MTU5OTAyOTIyMX0.bF_4brYY9l5E2hRJCiEhFheYRMZIO1BF6QYRRFvT_Fs'
    );
  }
}
