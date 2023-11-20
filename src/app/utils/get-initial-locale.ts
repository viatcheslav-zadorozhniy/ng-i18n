import { Locale, SUPPORTED_LOCALES, defaultLocale, localeStorageKey } from '../locale';

export const getInitialLocale = (): Locale => {
  const navigatorLanguage = navigator.language.slice(0, 2) as Locale;

  let locale = localStorage.getItem(localeStorageKey) as Locale
    || navigatorLanguage
    || defaultLocale
  ;

  // If locale is not supported, fallback to the `navigator.language` if supported or the default.
  if (!SUPPORTED_LOCALES.includes(locale)) {
    locale = SUPPORTED_LOCALES.includes(navigatorLanguage) ? navigatorLanguage : defaultLocale;
  }

  return locale;
};
