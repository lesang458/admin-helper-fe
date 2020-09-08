import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TitleService {
  public i18nKey: string;

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {}

  public changeTitle(i18nKey: string): void {
    this.i18nKey = i18nKey;
    this.titleService.setTitle(this.translate.instant(i18nKey));
  }
}
