import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

export interface Locale {
  lang: string;
  data: object;
}

@Injectable({
  providedIn: 'root'
})
export class CoreTranslationService {
  constructor(private translateService: TranslateService) {}
  translate(...args: Locale[]): void {
    const locales = [...args];
    locales.forEach(locale => {
      this.translateService.setTranslation(locale.lang, locale.data, true);
    });
  }
  translateText(text: any): string {
    if(!text) return '';
    return this.translateService.instant(text);
  }
}
