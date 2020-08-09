import { takeEvery, call, put } from 'redux-saga/effects';

import { ERROR } from 'shared/constants/localeMessages';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { signUp, logIn, resetPass } from 'clientSrc/effects/authEffects';

const getAuthenticationSaga = effect => function* authenticationSaga({ payload }) {
  try {
    const response = yield call(effect, payload);
    if (!response.data.errors || !response.data.errors.length) {
      // We login user after both signUp and LogIn
      yield put(AuthActions.logInSuccess());
    } else {
      yield put(NotificationActions.addNotifications({
        errors: response.data.errors,
      }));
    }
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      errors: [ERROR.CONNECTION_ERROR],
    }));
  }
};

function* logInFacebookSaga(action) {
  const { payload: { profile: { first_name: nickname, email, id }, tokenDetail: { userID, signedRequest } } } = action;
  if (!(nickname || email || id || userID || signedRequest)) {
    const payload = {
      errors: [ERROR.LOG_IN_MISSING_FIELDS],
    };
    yield put(NotificationActions.addNotifications(payload));
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
    );
  }
}

function* logInGoogleSaga(action) {
  const { payload: { profileObj: { name, email, imageUrl, googleId }, tokenObj: { id_token: googleToken } } } = action;
  if (!(name || email || googleId || googleToken)) {
    const payload = {
      errors: [ERROR.LOG_IN_MISSING_FIELDS],
    };
    yield put(NotificationActions.addNotifications(payload));
  } else {
    yield put(AuthActions.signUp({
      nickname: { value: name, valid: true },
      email: { value: email, valid: true },
      photo: imageUrl,
      googleToken,
    }));
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload);
    yield put(NotificationActions.addNotifications(response.data));
  } catch (error) {
    yield put(NotificationActions.addNotifications({
      errors: [ERROR.CONNECTION_ERROR],
    }));
  }
}

export function* authSaga() {
  yield takeEvery(AuthActions.signUp.toString(), getAuthenticationSaga(signUp));
  yield takeEvery(AuthActions.logIn.toString(), getAuthenticationSaga(logIn));
  yield takeEvery(AuthActions.logInFacebook.toString(), logInFacebookSaga);
  yield takeEvery(AuthActions.logInGoogle.toString(), logInGoogleSaga);
  yield takeEvery(AuthActions.resetPass.toString(), resetPassSaga);
}
