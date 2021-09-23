import { call, takeEvery } from 'redux-saga/effects'

import { DialogActions } from '../actions'
import { generalSaga } from '../helpers/sagas'
import { disableDialog } from '../effects/dialogEffects'

function* disableDialogSaga ({ payload }) {
  yield call(generalSaga, disableDialog, payload)
}

export function* dialogsSaga () {
  yield takeEvery(DialogActions.disableDialog.toString(), disableDialogSaga)
}
