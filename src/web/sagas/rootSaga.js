import { all, call, fork, put } from 'redux-saga/effects'

import { authSaga } from './authSaga'
import { themeSaga } from './themeSaga'
import { localeSaga } from './localeSaga'
import { settingsSaga } from './settingsSaga'
import { connectionSaga } from './connectionSaga'
import { householdSaga } from './householdSaga'
import { dialogsSaga } from './dialogsSaga'
import { homeSaga } from './homeSaga'
import { loadState } from '../effects/rootEffects'
import { RootActions, DialogActions } from '../actions'
import { generalSaga } from '../helpers/sagas'

export default function* rootSaga () {
  yield all([
    fork(themeSaga),
    fork(localeSaga),
    fork(authSaga),
    fork(settingsSaga),
    fork(connectionSaga),
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
