import { createReducer } from '@reduxjs/toolkit'

import applicationTexts from 'shared/locales'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants'

import { STORAGE_KEY } from '../constants'
import { LocaleActions } from '../actions'

const storageLocale = localStorage.getItem(STORAGE_KEY.LOCALE)
const defaultLocale = AVAILABLE_LOCALES.includes(storageLocale)
  ? storageLocale
  : DEFAULT_LOCALE

localStorage.setItem(STORAGE_KEY.LOCALE, defaultLocale)

const initialState = {
  locale: defaultLocale,
  applicationTexts: applicationTexts[defaultLocale],
}

const localeChanged = (state, { payload: locale }) => ({
  ...state,
  locale,
  applicationTexts: applicationTexts[locale],
})

export default createReducer(initialState, {
  [LocaleActions.localeChanged.toString()]: localeChanged,
})
