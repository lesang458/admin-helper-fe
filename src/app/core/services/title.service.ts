import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TitleService {
  public i18nKey: string;

  public isShowLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {}

  public setTitle(i18nKey: string): void {
    this.i18nKey = `${i18nKey}.TITLE`;
    this.titleService.setTitle(`AH | ${this.translate.instant(this.i18nKey)}`);
  }
}
