import { createReducer } from '@reduxjs/toolkit'

import { HomeActions } from '../actions'
import { STORAGE_KEY } from '../constants'

const initialState = {
  selectedHousehold: localStorage.getItem(STORAGE_KEY.SELECTED_HOUSEHOLD),
  // null indicates the data has not been loaded yet
  households: null,
}

const householdsLoaded = (state, { payload: households }) => ({
  ...state,
  households,
  selectedHousehold: state.selectedHousehold ?? households[0]?.householdId,
})

const changeSelectedHousehold = (state, { payload: selectedHousehold }) => ({
  ...state,
  selectedHousehold,
})

export default createReducer(initialState, {
  [HomeActions.householdsLoaded.toString()]: householdsLoaded,
  [HomeActions.changeSelectedHousehold.toString()]: changeSelectedHousehold,
})
