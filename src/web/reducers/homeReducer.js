import { createReducer } from '@reduxjs/toolkit'

import { HomeActions } from '../actions'
import { SELECTED_HOUSEHOLD_KEY } from '../constants'

const initialState = {
  selectedHousehold: localStorage.getItem(SELECTED_HOUSEHOLD_KEY),
  households: [],
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
