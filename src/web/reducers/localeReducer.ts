import { createReducer } from '@reduxjs/toolkit'

import { applicationTexts, LocalizedApplicationTexts } from 'shared/locales'
import { LOCALE_CODE } from 'shared/constants'

import { LocaleActions } from '../actions'
import { getDefaultLocale } from '../helpers/useCurrentLocale'

export interface LocaleState {
  locale: LOCALE_CODE | null
  applicationTexts: LocalizedApplicationTexts
}

const defaultLocale = getDefaultLocale()
const initialState: LocaleState = {
  locale: null,
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
