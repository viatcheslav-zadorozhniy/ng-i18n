import { defaultLocale } from '../locale/default-locale';
import { Locale } from '../locale/locale';
import { localeStorageKey } from '../locale/locale-storage-key';
import { supportedLocales } from '../locale/supported-locales';

export const getInitialLocale = (): Locale => {
  const navigatorLanguage = navigator.language.slice(0, 2) as Locale;

  let locale = localStorage.getItem(localeStorageKey) as Locale
    || navigatorLanguage
    || defaultLocale
  ;

  // If locale is not supported, fallback to the `navigator.language` if supported or the default.
  if (!supportedLocales.includes(locale)) {
    locale = supportedLocales.includes(navigatorLanguage) ? navigatorLanguage : defaultLocale;
  }

  return locale;
};
