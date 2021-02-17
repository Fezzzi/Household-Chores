import { createReducer } from '@reduxjs/toolkit'

import { SettingsActions } from 'clientSrc/actions'
import { SETTING_CATEGORIES, CONNECTION_STATE_TYPE } from 'shared/constants'

const initialState = {
  categories: Object.values(SETTING_CATEGORIES),
  tabs: [],
  tabMessages: {},
  tabTypes: {},
  data: {},
}

const settingsLoaded = (state, { payload }) => ({
  ...state,
  ...payload,
})

const settingsDataUpdated = (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    ...payload,
  },
})

const connectionRequested = (state, { payload: { userId, message } }) => ({
  ...state,
  data: {
    ...state.data,
    [CONNECTION_STATE_TYPE.FOUND]: state.data[CONNECTION_STATE_TYPE.FOUND].map(connection => ({
      ...connection,
      message: connection.userId === userId
        ? message
        : connection.message,
      state: connection.userId === userId
        ? CONNECTION_STATE_TYPE.WAITING
        : connection.state,
    })),
  },
})

export default createReducer(initialState, {
  [SettingsActions.loadSettingsSuccess.toString()]: settingsLoaded,
  [SettingsActions.settingsDataUpdated.toString()]: settingsDataUpdated,
  [SettingsActions.connectionRequestSuccess.toString()]: connectionRequested,
})
