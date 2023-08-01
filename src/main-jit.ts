/// <reference types="@angular/localize" />

/**
 * Import all supported locales (used by Angular built-in pipes for localization).
 * Alternatively, it can be replaced with the native `Intl` API.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
import '@angular/common/locales/global/uk';
import '@angular/common/locales/global/he';

import { loadTranslations } from '@angular/localize';

import { defaultLocale, localeStorageKey } from './app/locale';
import { getInitialLocale, setDocumentI18nAttributes } from './app/utils';
import { bootstrap } from './bootstrap';

const locale = getInitialLocale();

localStorage.setItem(localeStorageKey, locale);

// It is not necessary to load any translations for the default locale.
if (locale === defaultLocale) {
  bootstrap(defaultLocale);
} else {
  fetch(`/assets/locales/${locale}.json`)
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(response => {
      $localize.locale = response.locale;

      setDocumentI18nAttributes(response.locale);
      loadTranslations(response.translations);
      bootstrap(response.locale);
    });
}
