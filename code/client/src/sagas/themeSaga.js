import { put, takeEvery, delay } from 'redux-saga/effects';
import * as ThemeActions from 'clientSrc/actions/themeActions';
import * as THEMES from "clientSrc/constants/themeTypes";

function* handleThemeChange({ payload: theme }) {
  try {
    const newTheme = theme === THEMES.LIGHT_THEME
      ? THEMES.DARK_THEME
      : THEMES.LIGHT_THEME;
    yield put(ThemeActions.changeTheme(newTheme));
    localStorage.setItem('theme', newTheme);
    // Stop theme transition effect
    yield delay(300);
    yield put(ThemeActions.stopThemeTransition())
  } catch (error) {
    console.error(error)
  }
}

export function* themeSaga() {
  yield takeEvery(ThemeActions.triggerThemeChange.toString(), handleThemeChange);
}