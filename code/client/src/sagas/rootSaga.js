import { all, call, fork, put } from 'redux-saga/effects'

import { authSaga } from 'clientSrc/sagas/authSaga'
import { themeSaga } from 'clientSrc/sagas/themeSaga'
import { localeSaga } from 'clientSrc/sagas/localeSaga'
import { settingsSaga } from 'clientSrc/sagas/settingsSaga'
import { loadState } from 'clientSrc/effects/rootEffects'
import { RootActions } from 'clientSrc/actions'
import { generalSaga } from 'clientSrc/helpers/sagas'

export default function* rootSaga() {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(authSaga),
    fork(settingsSaga),
  ])

  yield call(generalSaga, loadState, null, function* (data) {
    yield put(RootActions.stateLoaded(data))
  })
}
