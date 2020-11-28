import { takeEvery, call, put } from 'redux-saga/effects'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { AuthActions, NotificationActions } from 'clientSrc/actions'
import { signUp, logIn, resetPass } from 'clientSrc/effects/authEffects'

const getAuthenticationSaga = effect => function* authenticationSaga({ payload }) {
  try {
    const { data } = yield call(effect, payload)
    if (!data[NOTIFICATION_TYPE.ERRORS] || !data[NOTIFICATION_TYPE.ERRORS].length) {
      // We login user after both signUp and LogIn
      yield put(NotificationActions.addNotifications(data))
      yield put(AuthActions.logInSuccess())
    } else {
      yield put(NotificationActions.addNotifications({
        [NOTIFICATION_TYPE.ERRORS]: data[NOTIFICATION_TYPE.ERRORS],
      }))
    }
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

function* logInFacebookSaga(action) {
  const { payload: { profile: { first_name: nickname, email, id }, tokenDetail: { userID, signedRequest } } } = action
  if (!(nickname || email || id || userID || signedRequest)) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.LOG_IN_MISSING_FIELDS],
    }))
  } else {
    yield put(AuthActions.signUp({
      nickname: { value: nickname, valid: true },
      email: { value: email, valid: true },
      photo: `https://graph.facebook.com/${id}/picture`,
      facebook: {
        userID,
        signedRequest,
      },
    })
    )
  }
}

function* logInGoogleSaga(action) {
  const { payload: { profileObj: { name, email, imageUrl, googleId }, tokenObj: { id_token: googleToken } } } = action
  if (!(name || email || googleId || googleToken)) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.LOG_IN_MISSING_FIELDS],
    }))
  } else {
    yield put(AuthActions.signUp({
      nickname: { value: name, valid: true },
      email: { value: email, valid: true },
      photo: imageUrl,
      googleToken,
    }))
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload)
    yield put(NotificationActions.addNotifications(response.data))
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR],
    }))
  }
}

export function* authSaga() {
  yield takeEvery(AuthActions.signUp.toString(), getAuthenticationSaga(signUp))
  yield takeEvery(AuthActions.logIn.toString(), getAuthenticationSaga(logIn))
  yield takeEvery(AuthActions.logInFacebook.toString(), logInFacebookSaga)
  yield takeEvery(AuthActions.logInGoogle.toString(), logInGoogleSaga)
  yield takeEvery(AuthActions.resetPass.toString(), resetPassSaga)
}
