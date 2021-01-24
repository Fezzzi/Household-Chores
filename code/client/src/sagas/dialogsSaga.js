import { call, takeEvery } from 'redux-saga/effects'

import { DialogActions } from 'clientSrc/actions'
import { generalSaga } from 'clientSrc/helpers/sagas'
import { disableDialog } from 'clientSrc/effects/dialogEffects'

function* disableDialogSaga({ payload }) {
  yield call(generalSaga, disableDialog, payload)
}

export function* dialogsSaga() {
  yield takeEvery(DialogActions.disableDialog.toString(), disableDialogSaga)
}
