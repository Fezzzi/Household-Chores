import { takeEvery, call, put } from 'redux-saga/effects'

import { generalSaga } from '../helpers/sagas'
import { findUsers, connectionRequest } from '../effects/conectionEffects'
import { ConnectionActions, SettingsActions } from '../actions'

function* connectionActionSaga ({ payload: { effect, data } }) {
  yield call(generalSaga, effect, data, function* (response) {
    yield put(SettingsActions.settingsDataUpdated(response))
  })
}

function* searchConnectionActionSaga ({ payload }) {
  yield call(generalSaga, findUsers, payload, function* (response) {
    yield put(SettingsActions.settingsDataUpdated(response))
  })
}

function* connectionRequestSaga ({ payload }) {
  yield call(generalSaga, connectionRequest, payload, function* () {
    yield put(ConnectionActions.connectionRequestSuccess(payload))
  })
}

export function* connectionSaga () {
  yield takeEvery(ConnectionActions.connectionAction.toString(), connectionActionSaga)
  yield takeEvery(ConnectionActions.searchConnectionAction.toString(), searchConnectionActionSaga)
  yield takeEvery(ConnectionActions.connectionRequest.toString(), connectionRequestSaga)
}
