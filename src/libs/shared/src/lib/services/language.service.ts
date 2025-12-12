import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ar_EG, en_US, NzI18nService } from 'ng-zorro-antd/i18n';

export type Direction = 'ltr' | 'rtl';
export type SupportedLanguage = 'en' | 'ar';

interface LanguageConfig {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  direction: Direction;
  locale: typeof en_US | typeof ar_EG;
}

const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
    locale: en_US
  },
  ar: {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    direction: 'rtl',
    locale: ar_EG
  }
};

const STORAGE_KEY = 'app-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  #translocoService = inject(TranslocoService);
  #nzI18nService = inject(NzI18nService);

  selectedLanguage = signal<SupportedLanguage>('en');
  currentDirection = computed<Direction>(() => 
    LANGUAGE_CONFIGS[this.selectedLanguage()].direction
  );
  isRTL = computed<boolean>(() => 
    this.currentDirection() === 'rtl'
  );
  currentLangConfig = computed<LanguageConfig>(() => 
    LANGUAGE_CONFIGS[this.selectedLanguage()]
  );


  constructor() {
    this.initializeLanguage();
    this.setupDirectionEffect();
  }

  private initializeLanguage(): void {
    const savedLang = this.getSavedLanguage();
    this.setLanguage(savedLang);
  }

  private setupDirectionEffect(): void {
    effect(() => {
      const direction = this.currentDirection();
      const lang = this.selectedLanguage();
      
      document.documentElement.setAttribute('dir', direction);
      document.documentElement.setAttribute('lang', lang);
      document.body.classList.toggle('rtl', direction === 'rtl');
      document.body.classList.toggle('ltr', direction === 'ltr');
    });
  }

  setLanguage(lang: SupportedLanguage): void {
    const config = LANGUAGE_CONFIGS[lang];
    
    if (!config) {
      console.error(`Unsupported language: ${lang}`);
      return;
    }

    // Update Transloco
    this.#translocoService.setActiveLang(lang);

    // Update Ng Zorro locale
    this.#nzI18nService.setLocale(config.locale);

    // Update signal (this will trigger the effect to update DOM)
    this.selectedLanguage.set(lang);

    // Persist to storage
    this.saveLanguage(lang);
  }

  toggleLanguage(): void {
    const currentLang = this.selectedLanguage();
    const newLang: SupportedLanguage = currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  private getSavedLanguage(): SupportedLanguage {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') {
        return saved;
      }
    } catch (error) {
      console.error('Error reading language from localStorage:', error);
    }
    return 'en'; // Default fallback
  }

  private saveLanguage(lang: SupportedLanguage): void {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      console.error('Error saving language to localStorage:', error);
    }
  }

  getSupportedLanguages(): LanguageConfig[] {
    return Object.values(LANGUAGE_CONFIGS);
  }

  isLanguageSupported(lang: string): lang is SupportedLanguage {
    return lang === 'en' || lang === 'ar';
  }


  
}
