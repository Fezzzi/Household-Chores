import { createReducer } from '@reduxjs/toolkit'

import applicationTexts from 'shared/locales'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants'

import { LOCALE_KEY } from '../constants'
import { LocaleActions } from '../actions'

const storageLocale = localStorage.getItem(LOCALE_KEY)

const initialState = {
  locale: storageLocale || DEFAULT_LOCALE,
  availableLocales: AVAILABLE_LOCALES,
  applicationTexts: applicationTexts[storageLocale ?? DEFAULT_LOCALE],
}

const localeChanged = (state, { payload: locale }) => ({
  ...state,
  locale,
  applicationTexts: applicationTexts[locale],
})

export default createReducer(initialState, {
  [LocaleActions.localeChanged.toString()]: localeChanged,
})
