import { takeEvery, call, put } from 'redux-saga/effects'

import { generalSaga } from 'clientSrc/helpers/sagas'
import { updateSettings, loadSettings } from 'clientSrc/effects/settingsEffects'
import { findUsers, connectionRequest } from 'clientSrc/effects/conectionEffects'
import { SettingsActions, NotificationActions } from 'clientSrc/actions'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { INFO, SUCCESS } from 'shared/constants/localeMessages'

function* loadSettingsSaga({ payload }) {
  yield call(generalSaga, loadSettings, payload, function* (data) {
    yield put(SettingsActions.loadSettingsSuccess(data))
  })
}

function* editSettingsSaga({ payload }) {
  if (Object.values(payload.inputs).length === 0) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE],
    }))
  } else {
    yield call(generalSaga, updateSettings, payload, function* (data) {
      yield put(SettingsActions.loadSettingsSuccess(data))
      yield put(NotificationActions.addNotifications({
        [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.SETTINGS_UPDATED],
      }))
    })
  }
}

function* connectionActionSaga({ payload: { effect, targetId } }) {
  yield call(generalSaga, effect, targetId, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

function* searchConnectionActionSaga({ payload }) {
  yield call(generalSaga, findUsers, payload, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

function* connectionRequestSaga({ payload }) {
  yield call(generalSaga, connectionRequest, payload, function* (data) {
    yield put(SettingsActions.connectionRequestSuccess(data))
  })
}

export function* settingsSaga() {
  yield takeEvery(SettingsActions.loadSettings.toString(), loadSettingsSaga)
  yield takeEvery(SettingsActions.editSettings.toString(), editSettingsSaga)
  yield takeEvery(SettingsActions.connectionAction.toString(), connectionActionSaga)
  yield takeEvery(SettingsActions.searchConnectionAction.toString(), searchConnectionActionSaga)
  yield takeEvery(SettingsActions.connectionRequest.toString(), connectionRequestSaga)
}
