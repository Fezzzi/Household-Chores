import { takeEvery, call, put } from 'redux-saga/effects';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as RootActions from 'clientSrc/actions/rootActions';
import { signUp, logIn, resetPass } from 'clientSrc/effects/authEffects';

function* signUpSaga(action) {
  try {
    const response = yield call(signUp, action.payload);
    if (!response.data.errors) {
      yield put(AuthActions.signUpSuccess(response.data));
    } else {
      yield put(RootActions.addNotifications({
        errors: response.data.errors
      }));
    }
  } catch (error) {
    yield put(RootActions.addNotifications({
      errors: ['Connection error, please try again later.'],
    }));
  }
}

function* logInSaga(action) {
  try {
    const response = yield call(logIn, action.payload);
    if (!response.data.errors) {
      yield put(AuthActions.logInSuccess(response.data));
    } else {
      yield put(RootActions.addNotifications({
        errors: response.data.errors
      }));
    }
  } catch (error) {
    yield put(RootActions.addNotifications({
      errors: ['Connection error, please try again later.'],
    }));
  }
}

function* logInFacebookSaga(action) {
  const { payload: { profile: { first_name: nickname, email, id }, tokenDetail } } = action;
  if (!(nickname || email || id || tokenDetail)) {
    const payload = action.type === AuthActions.logInFacebook.toString()
      ? { errors: ['Log in failed, missing one or more required fields.'] }
      : { errors: ['Sign up failed, missing one or more required fields.'] };
    yield put(RootActions.addNotifications(payload));
  } else {
    yield put(
      (action.type === AuthActions.logInFacebook.toString()
        ? AuthActions.logIn
        : AuthActions.signUp
      )({
        nickname,
        email,
        image: `https://graph.facebook.com/${id}/picture`,
        facebook: tokenDetail,
      }));
  }
}

function* logInGoogleSaga(action) {
  const { payload: { profileObj: { name, email, imageUrl, googleId }, tokenObj } } = action;
  if (!(name || email || googleId || tokenObj)) {
    const payload = action.type === AuthActions.logInGoogle.toString()
      ? { errors: ['Log in failed, missing one or more required fields.'] }
      : { errors: ['Sign up failed, missing one or more required fields.'] };
    yield put(RootActions.addNotifications(payload));
  } else {
    yield put(
      (action.type === AuthActions.logInGoogle.toString()
        ? AuthActions.logIn
        : AuthActions.signUp
      )({
        nickname: name,
        email,
        image: imageUrl,
        google: tokenObj,
      }));
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload);
    yield put(RootActions.addNotifications(response.data));
  } catch (error) {
    yield put(RootActions.addNotifications({
      errors: ['Connection error, please try again later.'],
    }));
  }
}

export function* authSaga() {
  yield takeEvery(AuthActions.signUp.toString(), signUpSaga);
  yield takeEvery(AuthActions.logIn.toString(), logInSaga);
  yield takeEvery([
    AuthActions.logInFacebook.toString(),
    AuthActions.signUpFacebook.toString(),
  ], logInFacebookSaga);
  yield takeEvery([
    AuthActions.logInGoogle.toString(),
    AuthActions.signUpGoogle.toString(),
  ], logInGoogleSaga);
  yield takeEvery(AuthActions.resetPass.toString(), resetPassSaga);
}
