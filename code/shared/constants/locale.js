// This must match directory names of code/server/resources
export const CODES = ({
  CS: 'cs_CZ',
  EN: 'en_US',
});

export const DEFAULT_LOCALE = CODES.EN;
export const AVAILABLE_LOCALES = Object.values(CODES);

export const LABELS = ({
  [CODES.CS]: 'CZE',
  [CODES.EN]: 'ENG',
});
