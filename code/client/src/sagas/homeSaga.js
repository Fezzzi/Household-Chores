import { call, put, takeEvery } from 'redux-saga/effects'

import { HomeActions } from 'clientSrc/actions'
import { generalSaga } from 'clientSrc/helpers/sagas'
import { loadHouseholds } from 'clientSrc/effects/homeEffects'
import { SELECTED_HOUSEHOLD_KEY } from 'clientSrc/constants'

function changeSelectedHouseholdSaga({ payload }) {
  localStorage.setItem(SELECTED_HOUSEHOLD_KEY, payload)
}

function* loadHouseholdsSaga() {
  yield call(generalSaga, loadHouseholds, null, function* (data) {
    yield put(HomeActions.householdsLoaded(data))
  })
}

export function* homeSaga() {
  yield takeEvery(HomeActions.changeSelectedHousehold.toString(), changeSelectedHouseholdSaga)
  yield takeEvery(HomeActions.loadHouseholds.toString(), loadHouseholdsSaga)
}
