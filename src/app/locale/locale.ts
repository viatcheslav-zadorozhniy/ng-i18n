import { SUPPORTED_LOCALES } from './supported-locales';

// Create a type from the supported locales list.
export type Locale = typeof SUPPORTED_LOCALES[number];
