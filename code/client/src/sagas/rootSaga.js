import { all, call, fork, put } from 'redux-saga/effects';
import { testSaga } from 'clientSrc/sagas/testSaga';
import { authSaga } from 'clientSrc/sagas/authSaga';
import * as RootActions from 'clientSrc/actions/rootActions';
import { loadState } from 'clientSrc/effects/rootEffects';


export function* rootSaga() {
  yield all([
    fork(testSaga),
    fork(authSaga),
  ]);

  const response = yield call(loadState);
  yield put(RootActions.stateLoaded(response.data));
}
