import { createAction } from '@reduxjs/toolkit'

export const triggerLocaleChange = createAction('TRIGGER_LANG_CHANGE')
export const updateLocale = createAction('UPDATE_LOCALE')
export const localeChanged = createAction('LOCALE_CAHNGED')
