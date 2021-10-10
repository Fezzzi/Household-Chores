import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'

import { authSaga } from './authSaga'
import { themeSaga } from './themeSaga'
import { localeSaga } from './localeSaga'
import { settingsSaga } from './settingsSaga'
import { connectionSaga } from './connectionSaga'
import { householdSaga } from './householdSaga'
import { dialogsSaga } from './dialogsSaga'
import { homeSaga } from './homeSaga'
import { loadFeed, loadState } from '../effects/loadEffects'
import { LoadActions, DialogActions, LocaleActions } from '../actions'
import { generalSaga } from '../helpers/sagas'

function* stateLoadSaga () {
  yield call(generalSaga, loadState, null, function* (data) {
    const {
      dialogSettings,
      ...rootData
    } = data

    const locale = yield select(({ locale }) => locale.locale)
    if (locale === null && rootData.user?.locale) {
      yield put(LocaleActions.updateLocale(rootData.user.locale))
    } else if (locale !== null && rootData.user != null && rootData.user.locale !== locale) {
      yield put(LocaleActions.triggerLocaleChange(rootData.user.locale))
    }

    yield put(LoadActions.stateLoadSuccess(rootData))
    yield put(DialogActions.loadDialogSettings(dialogSettings))
  })
}

function* feedLoadSaga ({ payload: { page, pageSize, callbackFunc } }) {
  yield call(
    generalSaga,
    loadFeed,
    { page, pageSize },
    function* (data) {
      yield put(LoadActions.feedLoadSuccess(data))
      if (callbackFunc != null) {
        callbackFunc(data)
      }
    },
    function () {
      if (callbackFunc != null) {
        callbackFunc([])
      }
    })
}

export default function* rootSaga () {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(authSaga),
    fork(settingsSaga),
    fork(connectionSaga),
    fork(householdSaga),
    fork(dialogsSaga),
    fork(homeSaga),
  ])

  yield takeEvery(LoadActions.stateLoad.toString(), stateLoadSaga)
  yield takeEvery(LoadActions.feedLoad.toString(), feedLoadSaga)

  yield put(LoadActions.stateLoad())
}
