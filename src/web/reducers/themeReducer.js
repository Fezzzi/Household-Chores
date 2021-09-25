import { createReducer } from '@reduxjs/toolkit'

import { ThemeActions } from '../actions'
import { DEFAULT_THEME, STORAGE_KEY, AVAILABLE_THEMES } from '../constants'

const storageTheme = localStorage.getItem(STORAGE_KEY.THEME)
const defaultTheme = AVAILABLE_THEMES.includes(storageTheme)
  ? storageTheme
  : DEFAULT_THEME

localStorage.setItem(STORAGE_KEY.THEME, defaultTheme)

const initialState = {
  theme: defaultTheme,
  changing: false,
}

const changeTheme = (state, { payload: theme }) => ({
  ...state,
  theme,
  changing: true,
})

const stopTransition = state => ({
  ...state,
  changing: false,
})

export default createReducer(initialState, {
  [ThemeActions.changeTheme.toString()]: changeTheme,
  [ThemeActions.stopThemeTransition.toString()]: stopTransition,
})
