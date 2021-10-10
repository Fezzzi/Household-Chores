import { put, takeEvery, delay } from 'redux-saga/effects'

import { THEME_TYPE, STORAGE_KEY } from '../constants'
import { ThemeActions } from '../actions'

function* handleThemeChange ({ payload: theme }) {
  try {
    const newTheme = theme === THEME_TYPE.LIGHT
      ? THEME_TYPE.DARK
      : THEME_TYPE.LIGHT

    yield put(ThemeActions.changeTheme(newTheme))
    localStorage.setItem(STORAGE_KEY.THEME, newTheme)
    // Stop theme transition effect
    yield delay(300)
    yield put(ThemeActions.stopThemeTransition())
  } catch (error) {
    console.error(error)
  }
}

export function* themeSaga () {
  yield takeEvery(ThemeActions.triggerThemeChange.toString(), handleThemeChange)
}
