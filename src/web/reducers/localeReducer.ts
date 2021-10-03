import { createReducer } from '@reduxjs/toolkit'

import { applicationTexts, LocalizedApplicationTexts } from 'shared/locales'
import { DEFAULT_LOCALE, isAvailableLocale, LOCALE_CODE } from 'shared/constants'

import { STORAGE_KEY } from '../constants'
import { LocaleActions } from '../actions'

const storageLocale = localStorage.getItem(STORAGE_KEY.LOCALE)
const defaultLocale = storageLocale && isAvailableLocale(storageLocale)
  ? storageLocale
  : DEFAULT_LOCALE

localStorage.setItem(STORAGE_KEY.LOCALE, defaultLocale)

export interface LocaleState {
  locale: LOCALE_CODE
  applicationTexts: LocalizedApplicationTexts
}

const initialState: LocaleState = {
  locale: defaultLocale,
  applicationTexts: applicationTexts[defaultLocale],
}

const localeChanged = (state: LocaleState, { payload: locale }: { payload: LOCALE_CODE }) => ({
  ...state,
  locale,
  applicationTexts: applicationTexts[locale],
})

export const localeReducer = createReducer(initialState, {
  [LocaleActions.localeChanged.toString()]: localeChanged,
})
