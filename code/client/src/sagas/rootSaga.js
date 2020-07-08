import { all, fork } from 'redux-saga/effects';
import { testSaga } from 'clientSrc/sagas/testSaga';
import { authSaga } from 'clientSrc/sagas/authSaga';


export function* rootSaga() {
  yield all([
    fork(testSaga),
    fork(authSaga),
  ]);
}
