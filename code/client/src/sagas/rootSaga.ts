import { all, fork } from 'redux-saga/effects';
import { testSaga } from 'clientSrc/sagas/testSaga';


export function* rootSaga() {
  yield all([
     fork(testSaga),
  ]);
}
