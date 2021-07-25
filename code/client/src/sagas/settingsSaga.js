import { takeEvery, call, put } from 'redux-saga/effects'

import { generalSaga } from 'clientSrc/helpers/sagas'
import { updateSettings, loadSettings } from 'clientSrc/effects/settingsEffects'
import { SettingsActions, LocaleActions, NotificationActions } from 'clientSrc/actions'
import { AVAILABLE_LOCALES, NOTIFICATION_TYPE } from 'shared/constants'
import { INFO, SUCCESS } from 'shared/constants/localeMessages'

function* loadSettingsSaga({ payload }) {
  yield call(generalSaga, loadSettings, payload, function* (data) {
    const { data: { locale } } = data
    if (locale && AVAILABLE_LOCALES.includes(locale)) {
      yield put(LocaleActions.changeLocale(locale))
    }
    yield put(SettingsActions.loadSettingsSuccess(data))
  })
}

function* editSettingsSaga({ payload }) {
  if (Object.values(payload.inputs).length === 0) {
    yield put(NotificationActions.addNotifications({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] }))
  } else {
    yield call(generalSaga, updateSettings, payload, function* (data) {
      yield put(SettingsActions.loadSettingsSuccess(data))
      yield put(NotificationActions.addNotifications({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.SETTINGS_UPDATED] }))
    })
  }
}

export function* settingsSaga() {
  yield takeEvery(SettingsActions.loadSettings.toString(), loadSettingsSaga)
  yield takeEvery(SettingsActions.editSettings.toString(), editSettingsSaga)
}
