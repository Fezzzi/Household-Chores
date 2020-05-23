import { takeEvery, call, put } from 'redux-saga/effects';
import * as AuthActions from 'clientSrc/actions/authActions';
import { signUp, logIn, resetPass } from 'clientSrc/effects/authEffects';

function* signUpSaga(action) {
  try {
    const response = yield call(signUp, action.payload);
    if (response.data.errors) {
      yield put(AuthActions.signUpSuccess(response.data));
    } else {
      yield put(AuthActions.signUpError(response.data.errors));
    }
  } catch (error) {
    yield put(AuthActions.signUpError({
      0: 'Connection error, please try again later.',
    }));
  }
}

function* logInSaga(action) {
  try {
    const response = yield call(logIn, action.payload);
    if (response.data.errors) {
      yield put(AuthActions.logInSuccess(response.data));
    } else {
      yield put(AuthActions.logInError(response.data.errors));
    }
  } catch (error) {
    yield put(AuthActions.logInError({
      0: 'Connection error, please try again later.',
    }));
  }
}

function* resetPassSaga(action) {
  try {
    const response = yield call(resetPass, action.payload);
    if (response.data.errors) {
      yield put(AuthActions.resetPassSuccess(response.data));
    } else {
      yield put(AuthActions.resetPassError(response.data.errors));
    }
  } catch (error) {
    yield put(AuthActions.resetPassError({
      0: 'Connection error, please try again later.',
    }));
  }
}

export function* authSaga() {
  yield takeEvery(AuthActions.signUp.toString(), signUpSaga);
  yield takeEvery(AuthActions.logIn.toString(), logInSaga);
  yield takeEvery(AuthActions.resetPass.toString(), resetPassSaga);
}
