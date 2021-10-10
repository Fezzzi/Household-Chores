// These must match directory names of src/api/resources
export enum LOCALE_CODE {
  CS = 'cs_CZ',
  EN = 'en_US',
}

export const DEFAULT_LOCALE = LOCALE_CODE.EN
export const AVAILABLE_LOCALES = Object.values(LOCALE_CODE)

export const isAvailableLocale = (locale: string): locale is LOCALE_CODE =>
  AVAILABLE_LOCALES.includes(locale as any)

export const LOCALE_LABELS = {
  [LOCALE_CODE.CS]: 'CZE',
  [LOCALE_CODE.EN]: 'ENG',
} as const
