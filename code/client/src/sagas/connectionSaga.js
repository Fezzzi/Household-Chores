import { takeEvery, call, put } from 'redux-saga/effects'

import { generalSaga } from 'clientSrc/helpers/sagas'
import { findUsers, connectionRequest } from 'clientSrc/effects/conectionEffects'
import { ConnectionActions, SettingsActions } from 'clientSrc/actions'

function* connectionActionSaga({ payload: { effect, userId } }) {
  yield call(generalSaga, effect, userId, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

function* searchConnectionActionSaga({ payload }) {
  yield call(generalSaga, findUsers, payload, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

function* connectionRequestSaga({ payload }) {
  yield call(generalSaga, connectionRequest, payload, function* () {
    yield put(ConnectionActions.connectionRequestSuccess(payload))
  })
}

export function* connectionSaga() {
  yield takeEvery(ConnectionActions.connectionAction.toString(), connectionActionSaga)
  yield takeEvery(ConnectionActions.searchConnectionAction.toString(), searchConnectionActionSaga)
  yield takeEvery(ConnectionActions.connectionRequest.toString(), connectionRequestSaga)
}
