import { call, put, takeEvery } from 'redux-saga/effects'

import { LocaleActions } from 'clientSrc/actions'
import { LOCALE_KEY } from 'clientSrc/constants'
import { generalSaga } from 'clientSrc/helpers/sagas'
import { updateLocale } from 'clientSrc/effects/settingsEffects'

function* handleTriggerLocaleChange({ payload: newLocale }) {
  yield call(generalSaga, updateLocale, { locale: newLocale }, function* () {
    yield put(LocaleActions.updateLocale(newLocale))
  })
}

function* handleUpdateLocale({ payload: newLocale }) {
  yield put(LocaleActions.localeChanged(newLocale))
  localStorage.setItem(LOCALE_KEY, newLocale)
}

export function* localeSaga() {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleTriggerLocaleChange)
  yield takeEvery(LocaleActions.updateLocale.toString(), handleUpdateLocale)
}
