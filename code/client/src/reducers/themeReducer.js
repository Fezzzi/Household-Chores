import { createReducer } from '@reduxjs/toolkit';

import * as ThemeActions from 'clientSrc/actions/themeActions';
import * as THEMES from "clientSrc/constants/themeTypes";

const initialState = {
  theme: localStorage.getItem('theme') || THEMES.LIGHT_THEME,
  changing: false,
};

const changeTheme = (state, { payload: theme }) => ({
  ...state,
  theme,
  changing: true,
});

const stopTransition = state => ({
  ...state,
  changing: false,
});

export default createReducer(initialState, {
  [ThemeActions.changeTheme.toString()]: changeTheme,
  [ThemeActions.stopThemeTransition.toString()]: stopTransition,
});