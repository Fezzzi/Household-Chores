import { call, put, takeEvery } from 'redux-saga/effects'

import { STORAGE_KEY } from '../constants'
import { LocaleActions } from '../actions'
import { generalSaga } from '../helpers/sagas'
import { updateLocale } from '../effects/settingsEffects'

function* handleTriggerLocaleChange ({ payload: newLocale }) {
  yield call(generalSaga, updateLocale, { locale: newLocale }, function* () {
    yield put(LocaleActions.updateLocale(newLocale))
  })
}

function* handleUpdateLocale ({ payload: newLocale }) {
  yield put(LocaleActions.localeChanged(newLocale))
  localStorage.setItem(STORAGE_KEY.LOCALE, newLocale)
}

export function* localeSaga () {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleTriggerLocaleChange)
  yield takeEvery(LocaleActions.updateLocale.toString(), handleUpdateLocale)
}
