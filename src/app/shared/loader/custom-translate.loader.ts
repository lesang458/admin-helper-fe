import * as en from 'src/assets/i18n/en.json';
import * as vi from 'src/assets/i18n/vi.json';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export class CustomTranslateLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return new Observable((observer) => {
      const data = lang === 'vi' ? JSON.stringify(vi) : JSON.stringify(en);
      observer.next(JSON.parse(data).default);
      observer.complete();
    });
  }
}
