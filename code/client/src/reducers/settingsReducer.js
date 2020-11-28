import { createReducer } from '@reduxjs/toolkit'

import * as SettingsActions from 'clientSrc/actions/settingsActions'
import * as SettingTypes from 'shared/constants/settingTypes'
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType'

const initialState = {
  categories: Object.values(SettingTypes.CATEGORIES),
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

const connectionRequested = (state, { payload: { targetId } }) => ({
  ...state,
  data: {
    ...state.data,
    [CONNECTION_STATE_TYPE.FOUND]: state.data[CONNECTION_STATE_TYPE.FOUND].map(connection => ({
      ...connection,
      state: connection.id === targetId
        ? CONNECTION_STATE_TYPE.WAITING
        : connection.state,
    })),
  },
})

const invitationIgnored = (state, { payload: { fromId, householdId } }) => ({
  ...state,
  data: {
    ...state.data,
    invitations: state.data.invitations.filter(({ id_household: idHousehold, from: { id } }) =>
      idHousehold !== householdId && id !== fromId
    ),
  },
})

export default createReducer(initialState, {
  [SettingsActions.loadSettingsSuccess.toString()]: settingsLoaded,
  [SettingsActions.settingsDataUpdated.toString()]: settingsDataUpdated,
  [SettingsActions.connectionRequestSuccess.toString()]: connectionRequested,
  [SettingsActions.ignoreInvitationSuccess.toString()]: invitationIgnored,
})
