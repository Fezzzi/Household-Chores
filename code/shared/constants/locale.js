// This must match directory names of code/server/resources
export const LOCALE_CODES = ({
  CS: 'cs_CZ',
  EN: 'en_US',
})

export const DEFAULT_LOCALE = LOCALE_CODES.EN
export const AVAILABLE_LOCALES = Object.values(LOCALE_CODES)

export const LOCALE_LABELS = ({
  [LOCALE_CODES.CS]: 'CZE',
  [LOCALE_CODES.EN]: 'ENG',
})
