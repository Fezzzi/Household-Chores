import { createReducer } from '@reduxjs/toolkit'

import { ThemeActions } from '../actions'
import { THEME_TYPE, THEME_KEY } from '../constants'

const initialState = {
  theme: localStorage.getItem(THEME_KEY) || THEME_TYPE.LIGHT_THEME,
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
