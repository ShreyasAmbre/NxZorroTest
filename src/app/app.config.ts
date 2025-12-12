import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { NZ_I18N, en_US, ar_EG } from 'ng-zorro-antd/i18n';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from '@nx-zorro-test/core';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  UserOutline,
  SettingOutline,
  LogoutOutline,
  BellOutline,
  HomeOutline,
  LaptopOutline,
  GlobalOutline,
  NotificationOutline,
  MenuOutline
} from '@ant-design/icons-angular/icons';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideTranslocoPreloadLangs } from '@jsverse/transloco-preload-langs';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  UserOutline,
  SettingOutline,
  LogoutOutline,
  BellOutline,
  HomeOutline,
  LaptopOutline,
  GlobalOutline,
  NotificationOutline,
  MenuOutline
];

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#1890ff'
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        fallbackLang: 'en',
        missingHandler: {
          useFallbackTranslation: true
        }
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoPersistLang({
      storage: {
        useValue: localStorage,
      },
    }),
    // provideTranslocoPreloadLangs({ langs: ['en', 'ar'] })
  ],
};
