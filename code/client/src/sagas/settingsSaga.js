import { takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { handleResponse } from 'clientSrc/helpers/sagas'
import { updateSettings, loadSettings } from 'clientSrc/effects/settingsEffects'
import { findUsers, connectionRequest } from 'clientSrc/effects/conectionEffects'
import { createHousehold, invitationApprove, invitationIgnore } from 'clientSrc/effects/householdEffects'
import { SettingsActions, NotificationActions } from 'clientSrc/actions'
import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR, INFO, SUCCESS } from 'shared/constants/localeMessages'

function* loadSettingsSaga({ payload: { category, tab } }) {
  try {
    const { data } = yield call(loadSettings, category, tab)
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.loadSettingsSuccess(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* editSettingsSaga({ payload: { category, tab, inputs } }) {
  try {
    if (Object.values(inputs).length === 0) {
      yield put(NotificationActions.addNotifications({
        [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE],
      }))
    } else {
      const { data } = yield call(updateSettings, category, tab, inputs)

      yield call(handleResponse, data, function* (response) {
        yield put(SettingsActions.loadSettingsSuccess(response))
        yield put(NotificationActions.addNotifications({
          [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.SETTINGS_UPDATED],
        }))
      })
    }
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* connectionActionSaga({ payload: { effect, targetId } }) {
  try {
    const { data } = yield call(effect, targetId)
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* searchConnectionActionSaga({ payload: query }) {
  try {
    const { data } = yield call(findUsers, query)
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* connectionRequestSaga({ payload: { targetId, message } }) {
  try {
    const { data } = yield call(connectionRequest, { targetId, message })
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.connectionRequestSuccess(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* approveInvitationSaga({ payload }) {
  try {
    const { data } = yield call(invitationApprove, payload)
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* ignoreInvitationSaga({ payload }) {
  try {
    const { data } = yield call(invitationIgnore, payload)
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.ignoreInvitationSuccess(response))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* createHouseholdSaga({ payload }) {
  try {
    const { data } = yield call(createHousehold, payload)
    yield call(handleResponse, data, function* ({ url }) {
      yield put(push(url))
    })
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

export function* settingsSaga() {
  yield takeEvery(SettingsActions.loadSettings.toString(), loadSettingsSaga)
  yield takeEvery(SettingsActions.editSettings.toString(), editSettingsSaga)
  yield takeEvery(SettingsActions.connectionAction.toString(), connectionActionSaga)
  yield takeEvery(SettingsActions.searchConnectionAction.toString(), searchConnectionActionSaga)
  yield takeEvery(SettingsActions.connectionRequest.toString(), connectionRequestSaga)
  yield takeEvery(SettingsActions.approveInvitation.toString(), approveInvitationSaga)
  yield takeEvery(SettingsActions.ignoreInvitation.toString(), ignoreInvitationSaga)
  yield takeEvery(SettingsActions.createHousehold.toString(), createHouseholdSaga)
}
