import { createReducer } from '@reduxjs/toolkit'

import { THEME_TYPE, DEFAULT_THEME, STORAGE_KEY, isAvailableTheme } from 'web/constants'

import { ThemeActions } from '../actions'

const storageTheme = localStorage.getItem(STORAGE_KEY.THEME)
const defaultTheme = storageTheme && isAvailableTheme(storageTheme)
  ? storageTheme
  : DEFAULT_THEME

localStorage.setItem(STORAGE_KEY.THEME, defaultTheme)

export interface ThemeState {
  theme: THEME_TYPE
  changing: boolean
}

const initialState: ThemeState = {
  theme: defaultTheme,
  changing: false,
}

const changeTheme = (state: ThemeState, { payload: theme }: { payload: THEME_TYPE }) => ({
  ...state,
  theme,
  changing: true,
})

const stopTransition = (state: ThemeState) => ({
  ...state,
  changing: false,
})

export const themeReducer = createReducer(initialState, {
  [ThemeActions.changeTheme.toString()]: changeTheme,
  [ThemeActions.stopThemeTransition.toString()]: stopTransition,
})
