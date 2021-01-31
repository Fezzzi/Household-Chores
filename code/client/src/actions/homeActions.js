import { createAction } from '@reduxjs/toolkit'

export const loadHouseholds = createAction('LOAD_HOUSEHOLDS')
export const householdsLoaded = createAction('HOUSEHOLDS_LOADED')
export const changeSelectedHousehold = createAction('CHANGE_SELECTED_HOUSEHOLD')
