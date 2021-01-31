import { createReducer } from '@reduxjs/toolkit'

import { HomeActions } from 'clientSrc/actions'
import { SELECTED_HOUSEHOLD_KEY } from 'clientSrc/constants'
import { HOUSEHOLD_KEYS } from 'shared/constants/mappingKeys'

const initialState = {
  selectedHousehold: localStorage.getItem(SELECTED_HOUSEHOLD_KEY),
  households: [],
}

const householdsLoaded = (state, { payload: households }) => ({
  ...state,
  households,
  selectedHousehold: state.selectedHousehold ?? households[0]?.[HOUSEHOLD_KEYS.ID],
})

const changeSelectedHousehold = (state, { payload: selectedHousehold }) => ({
  ...state,
  selectedHousehold,
})

export default createReducer(initialState, {
  [HomeActions.householdsLoaded.toString()]: householdsLoaded,
  [HomeActions.changeSelectedHousehold.toString()]: changeSelectedHousehold,
})
