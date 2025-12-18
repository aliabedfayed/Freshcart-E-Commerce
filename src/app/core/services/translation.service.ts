import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = 'en';

  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {

      const savedLang = localStorage.getItem('lang');
      if (savedLang) {
        this.defaultLang = savedLang;
      }
      this.translateService.setFallbackLang(this.defaultLang);
      this.translateService.use(this.defaultLang);
    }
    this.changeDirection(this.defaultLang)
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
    this.changeDirection(lang)
  }

  changeDirection(lang: string) {
    if (isPlatformServer(this.platformId)) return

    const isArabic = (lang === 'ar')
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = isArabic ? 'ar' : 'en'
  }

}
