import { all, call, fork, put } from 'redux-saga/effects';
import { testSaga } from 'clientSrc/sagas/testSaga';
import { authSaga } from 'clientSrc/sagas/authSaga';
import { themeSaga } from 'clientSrc/sagas/themeSaga';
import { localeSaga } from 'clientSrc/sagas/localeSaga';
import { loadState } from 'clientSrc/effects/rootEffects';
import * as RootActions from 'clientSrc/actions/rootActions';

export function* rootSaga() {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(testSaga),
    fork(authSaga),
  ]);

  const response = yield call(loadState);
  yield put(RootActions.stateLoaded(response.data));
}
