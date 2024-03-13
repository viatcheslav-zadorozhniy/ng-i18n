import { APP_INITIALIZER, LOCALE_ID, ValueProvider, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';

import { AppRootComponent, JIT_TRANSLATION } from './app/app-root.component';
import { getRoutes } from './app/app.routes';
import { Locale } from './app/locale';
import { PageMetadataService, PageTitleStrategy } from './app/services';

export const bootstrap = (locale?: Locale) => {
  const localeProvider: ValueProvider[] = locale
    ? [{ provide: LOCALE_ID, useValue: locale }]
    : []
  ;

  bootstrapApplication(AppRootComponent, {
    providers: [
      ...localeProvider,
      provideRouter(getRoutes()),
      { provide: JIT_TRANSLATION, useValue: !!locale },
      { provide: TitleStrategy, useClass: PageTitleStrategy },
      {
        multi: true,
        provide: APP_INITIALIZER,
        useFactory: () => {
          const pageMetadataService = inject(PageMetadataService);
          return () => pageMetadataService.init();
        },
      },
    ],
  }).catch(error => console.error(error));
};
