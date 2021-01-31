import { all, call, fork, put } from 'redux-saga/effects'

import { authSaga } from 'clientSrc/sagas/authSaga'
import { themeSaga } from 'clientSrc/sagas/themeSaga'
import { localeSaga } from 'clientSrc/sagas/localeSaga'
import { settingsSaga } from 'clientSrc/sagas/settingsSaga'
import { householdSaga } from 'clientSrc/sagas/householdSaga'
import { dialogsSaga } from 'clientSrc/sagas/dialogsSaga'
import { homeSaga } from 'clientSrc/sagas/homeSaga'
import { loadState } from 'clientSrc/effects/rootEffects'
import { RootActions, DialogActions } from 'clientSrc/actions'
import { generalSaga } from 'clientSrc/helpers/sagas'

export default function* rootSaga() {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(authSaga),
    fork(settingsSaga),
    fork(householdSaga),
    fork(dialogsSaga),
    fork(homeSaga),
  ])

  yield call(generalSaga, loadState, null, function* (data) {
    const {
      dialogSettings,
      ...rootData
    } = data

    yield put(RootActions.stateLoaded(rootData))
    yield put(DialogActions.loadDialogSettings(dialogSettings))
  })
}
