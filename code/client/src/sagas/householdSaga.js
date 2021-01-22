import { takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { generalSaga } from 'clientSrc/helpers/sagas'
import {
  createHousehold, leaveHousehold, deleteHousehold, invitationApprove, invitationIgnore,
} from 'clientSrc/effects/householdEffects'
import { HouseholdActions, SettingsActions } from 'clientSrc/actions'

function* approveInvitationSaga({ payload }) {
  yield call(generalSaga, invitationApprove, payload, function* ({ url }) {
    yield put(push(url))
  })
}

function* ignoreInvitationSaga({ payload }) {
  yield call(generalSaga, invitationIgnore, payload, function* (data) {
    yield put(SettingsActions.settingsDataUpdated(data))
  })
}

function* createHouseholdSaga({ payload }) {
  yield call(generalSaga, createHousehold, payload, function* ({ url }) {
    yield put(push(url))
  })
}

function* leaveHouseholdSaga({ payload }) {
  yield call(generalSaga, leaveHousehold, payload, function* ({ url }) {
    yield put(push(url))
  })
}

function* deleteHouseholdSaga({ payload }) {
  yield call(generalSaga, deleteHousehold, payload, function* ({ url }) {
    yield put(push(url))
  })
}

export function* householdSaga() {
  yield takeEvery(HouseholdActions.approveInvitation.toString(), approveInvitationSaga)
  yield takeEvery(HouseholdActions.ignoreInvitation.toString(), ignoreInvitationSaga)
  yield takeEvery(HouseholdActions.createHousehold.toString(), createHouseholdSaga)
  yield takeEvery(HouseholdActions.leaveHousehold.toString(), leaveHouseholdSaga)
  yield takeEvery(HouseholdActions.deleteHousehold.toString(), deleteHouseholdSaga)
}
