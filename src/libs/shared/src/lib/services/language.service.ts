import { computed, DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ar_EG, en_US, NzI18nService } from 'ng-zorro-antd/i18n';

export type Direction = 'ltr' | 'rtl';
export type SupportedLanguage = 'en' | 'ar';

interface LanguageConfig {
  code: SupportedLanguage;
  direction: Direction;
  nzLocale: typeof en_US | typeof ar_EG;
}

const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    direction: 'ltr',
    nzLocale: en_US
  },
  ar: {
    code: 'ar',
    direction: 'rtl',
    nzLocale: ar_EG
  }
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // #translocoService = inject(TranslocoService);
  // #nzI18nService = inject(NzI18nService);
  // #doc = inject(DOCUMENT);

  // selectedLanguage = signal<SupportedLanguage>('en');
  // currentDirection = computed<Direction>(() => 
  //   LANGUAGE_CONFIGS[this.selectedLanguage()].direction
  // );
  // isRTL = computed<boolean>(() => 
  //   this.currentDirection() === 'rtl'
  // );
  // currentLangConfig = computed<LanguageConfig>(() => 
  //   LANGUAGE_CONFIGS[this.selectedLanguage()]
  // );
  private transloco = inject(TranslocoService);
  private nzI18n = inject(NzI18nService);
  private document = inject(DOCUMENT);

  currentLang = signal<SupportedLanguage>('en');
  direction = computed(() => LANGUAGE_CONFIGS[this.currentLang()].direction);


  constructor() {
    this.initLanguageEffects();
  }

  private initLanguageEffects() {
    effect(() => {
      const lang = this.currentLang();
      const dir = this.direction();

      // Transloco + Persist
      this.transloco.setActiveLang(lang);

      // Ng Zorro locale
      this.nzI18n.setLocale(LANGUAGE_CONFIGS[lang].nzLocale);

      // Update HTML direction & body class
      const html = this.document.documentElement;
      html.setAttribute('dir', dir);
      html.setAttribute('lang', lang);
      this.document.body.classList.toggle('rtl', dir === 'rtl');
      this.document.body.classList.toggle('ltr', dir === 'ltr');
    });
  }

  setLanguage(lang: SupportedLanguage) {
    this.currentLang.set(lang);
  }

  toggleLanguage() {
    this.currentLang.update(lang => (lang === 'en' ? 'ar' : 'en'));
  }

  getSupportedLanguages() {
    return Object.values(LANGUAGE_CONFIGS);
  }

  
}
