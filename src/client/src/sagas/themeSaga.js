import { put, takeEvery, delay } from 'redux-saga/effects'

import { ThemeActions } from 'clientSrc/actions'
import { THEME_TYPE, THEME_KEY } from 'clientSrc/constants'

function* handleThemeChange ({ payload: theme }) {
  try {
    const newTheme = theme === THEME_TYPE.LIGHT_THEME
      ? THEME_TYPE.DARK_THEME
      : THEME_TYPE.LIGHT_THEME
    yield put(ThemeActions.changeTheme(newTheme))
    localStorage.setItem(THEME_KEY, newTheme)
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
