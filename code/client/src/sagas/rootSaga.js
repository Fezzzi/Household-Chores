import { all, call, fork, put } from 'redux-saga/effects';

import { authSaga } from 'clientSrc/sagas/authSaga';
import { themeSaga } from 'clientSrc/sagas/themeSaga';
import { localeSaga } from 'clientSrc/sagas/localeSaga';
import { settingsSaga } from 'clientSrc/sagas/settingsSaga';
import { loadState } from 'clientSrc/effects/rootEffects';
import * as RootActions from 'clientSrc/actions/rootActions';

export function* rootSaga() {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(authSaga),
    fork(settingsSaga),
  ]);

  const response = yield call(loadState);
  yield put(RootActions.stateLoaded(response.data));
}
