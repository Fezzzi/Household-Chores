import { takeEvery, call, put } from 'redux-saga/effects';

import { handleResponse } from 'clientSrc/helpers/sagas';
import { updateSettings, loadSettings } from 'clientSrc/effects/settingsEffects';
import { findUsers, connectionRequest } from 'clientSrc/effects/conectionEffects';
import * as SettingsActions from 'clientSrc/actions/settingsActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR, INFO, SUCCESS } from 'shared/constants/localeMessages';
import { invitationApprove, invitationIgnore } from 'clientSrc/effects/householdEffects';

function* loadSettingsSaga({ payload: { category, tab } }) {
  try {
    const { data } = yield call(loadSettings, category, tab);
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.loadSettingsSuccess(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* editSettingsSaga({ payload: { category, tab, inputs } }) {
  try {
    if (Object.values(inputs).length === 0) {
      yield put(NotificationActions.addNotifications({
        [NotificationTypes.ERRORS]: [INFO.NOTHING_TO_UPDATE],
      }));
    }
    const { data } = yield call(updateSettings, category, tab, inputs);

    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.loadSettingsSuccess(response));
      yield put(NotificationActions.addNotifications({
        [NotificationTypes.SUCCESSES]: [SUCCESS.SETTINGS_UPDATED],
      }));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* connectionActionSaga({ payload: { effect, targetId } }) {
  try {
    const { data } = yield call(effect, targetId);
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* searchConnectionActionSaga({ payload: query }) {
  try {
    const { data } = yield call(findUsers, query);
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* connectionRequestSaga({ payload: { targetId, message } }) {
  try {
    const { data } = yield call(connectionRequest, { targetId, message });
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.connectionRequestSuccess(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* approveInvitationSaga({ payload }) {
  try {
    const { data } = yield call(invitationApprove, payload);
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.settingsDataUpdated(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

function* ignoreInvitationSaga({ payload }) {
  try {
    const { data } = yield call(invitationIgnore, payload);
    yield call(handleResponse, data, function* (response) {
      yield put(SettingsActions.ignoreInvitationSuccess(response));
    });
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: [ERROR.CONNECTION_ERROR],
    }));
  }
}

export function* settingsSaga() {
  yield takeEvery(SettingsActions.loadSettings.toString(), loadSettingsSaga);
  yield takeEvery(SettingsActions.editSettings.toString(), editSettingsSaga);
  yield takeEvery(SettingsActions.connectionAction.toString(), connectionActionSaga);
  yield takeEvery(SettingsActions.searchConnectionAction.toString(), searchConnectionActionSaga);
  yield takeEvery(SettingsActions.connectionRequest.toString(), connectionRequestSaga);
  yield takeEvery(SettingsActions.approveInvitation.toString(), approveInvitationSaga);
  yield takeEvery(SettingsActions.ignoreInvitation.toString(), ignoreInvitationSaga);
}
