import { takeEvery, call, put, select } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

import { AuthActions, NotificationActions, SettingsActions } from '../actions'
import { signUp, logIn, resetPass, deleteAccount } from '../effects/authEffects'
import { generalSaga } from '../helpers/sagas'

function* resetPassSaga ({ payload }) {
  const locale = yield select(({ locale }) => locale.locale)
  yield call(generalSaga, resetPass, { ...payload, locale }, function* (data) {
    yield put(NotificationActions.addNotifications(data))
  })
}

function* signUpSaga ({ payload }) {
  yield call(generalSaga, signUp, payload, function* (data) {
    yield put(NotificationActions.addNotifications(data))
    yield put(AuthActions.logInSuccess())
  })
}

function* logInSaga ({ payload }) {
  yield call(generalSaga, logIn, payload, function* (data) {
    yield put(NotificationActions.addNotifications(data))
    yield put(AuthActions.logInSuccess())
  })
}

function* logInFacebookSaga (action) {
  const { payload: { profile: { first_name: nickname, email, id }, tokenDetail: { userID, signedRequest } } } = action
  if (!(nickname || email || id || userID || signedRequest)) {
    yield put(NotificationActions.addNotifications({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.LOG_IN_MISSING_FIELDS] }))
  } else {
    yield put(AuthActions.signUp({ inputs: {
      nickname,
      email,
      photo: `https://graph.facebook.com/${id}/picture`,
      facebook: {
        userId: userID,
        signedRequest,
      },
    } })
    )
  }
}

function* logInGoogleSaga (action) {
  const { payload: { profileObj: { name, email, imageUrl, googleId }, tokenObj: { id_token: googleToken } } } = action
  if (!(name || email || googleId || googleToken)) {
    yield put(NotificationActions.addNotifications({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.LOG_IN_MISSING_FIELDS] }))
  } else {
    yield put(AuthActions.signUp({ inputs: {
      nickname: name,
      email,
      photo: imageUrl,
      googleToken,
    } }))
  }
}

function* deleteAccountSaga () {
  yield call(generalSaga, deleteAccount, null, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

export function* authSaga () {
  yield takeEvery(AuthActions.signUp.toString(), signUpSaga)
  yield takeEvery(AuthActions.logIn.toString(), logInSaga)
  yield takeEvery(AuthActions.logInFacebook.toString(), logInFacebookSaga)
  yield takeEvery(AuthActions.logInGoogle.toString(), logInGoogleSaga)
  yield takeEvery(AuthActions.resetPass.toString(), resetPassSaga)
  yield takeEvery(SettingsActions.deleteAccount.toString(), deleteAccountSaga)
}
