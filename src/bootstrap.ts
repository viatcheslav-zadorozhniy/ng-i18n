import { LOCALE_ID, ValueProvider } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, TitleStrategy } from '@angular/router';

import { AppRootComponent, JIT_TRANSLATION } from './app/app-root.component';
import { getRoutes } from './app/app.routes';
import { Locale } from './app/locale';
import { PageTitleStrategy } from './app/services';

export const bootstrap = (locale?: Locale): void => {
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
    ],
  }).catch(error => console.error(error));
};
