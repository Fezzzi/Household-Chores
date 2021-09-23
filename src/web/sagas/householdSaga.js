import { takeEvery, call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { API, HOUSEHOLD_TABS, SETTING_CATEGORIES } from 'shared/constants'

import { generalSaga } from '../helpers/sagas'
import {
  createHousehold, leaveHousehold, deleteHousehold, invitationApprove, invitationIgnore,
} from '../effects/householdEffects'
import { HouseholdActions } from '../actions'

function* approveInvitationSaga ({ payload }) {
  yield call(generalSaga, invitationApprove, payload, function* ({ url }) {
    yield put(push(url))
  })
}

function* ignoreInvitationSaga ({ payload }) {
  yield call(generalSaga, invitationIgnore, payload)
}

function* createHouseholdSaga ({ payload }) {
  yield call(generalSaga, createHousehold, payload, function* ({ url }) {
    yield put(push(url))
  })
}

function* leaveHouseholdSaga ({ payload }) {
  yield call(generalSaga, leaveHousehold, payload, function* (success) {
    if (success) {
      yield put(push(`/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.INVITATIONS}`))
    }
  })
}

function* deleteHouseholdSaga ({ payload }) {
  yield call(generalSaga, deleteHousehold, payload, function* (success) {
    if (success) {
      yield put(push(`/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.INVITATIONS}`))
    }
  })
}

export function* householdSaga () {
  yield takeEvery(HouseholdActions.approveInvitation.toString(), approveInvitationSaga)
  yield takeEvery(HouseholdActions.ignoreInvitation.toString(), ignoreInvitationSaga)
  yield takeEvery(HouseholdActions.createHousehold.toString(), createHouseholdSaga)
  yield takeEvery(HouseholdActions.leaveHousehold.toString(), leaveHouseholdSaga)
  yield takeEvery(HouseholdActions.deleteHousehold.toString(), deleteHouseholdSaga)
}
