import { put, takeEvery } from 'redux-saga/effects'

import { LocaleActions } from 'clientSrc/actions'
import { LOCALE_KEY } from 'clientSrc/constants/common'

function* handleLocaleChange({ payload: newLocale }) {
  try {
    yield put(LocaleActions.changeLocale(newLocale))
    localStorage.setItem(LOCALE_KEY, newLocale)
  } catch (error) {
    console.error(error)
  }
}

export function* localeSaga() {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleLocaleChange)
}
