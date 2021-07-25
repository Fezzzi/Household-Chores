import { call, put, takeEvery } from 'redux-saga/effects'

import { LocaleActions } from 'clientSrc/actions'
import { LOCALE_KEY } from 'clientSrc/constants'
import { generalSaga } from 'clientSrc/helpers/sagas'
import { changeLocale } from 'clientSrc/effects/settingsEffects'

function* handleTriggerLocaleChange({ payload: newLocale }) {
  yield call(generalSaga, changeLocale, { locale: newLocale }, function* () {
    yield put(LocaleActions.changeLocale(newLocale))
  })
}

function* handleChangeLocale({ payload: newLocale }) {
  yield put(LocaleActions.localeChanged(newLocale))
  localStorage.setItem(LOCALE_KEY, newLocale)
}

export function* localeSaga() {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleTriggerLocaleChange)
  yield takeEvery(LocaleActions.changeLocale.toString(), handleChangeLocale)
}
