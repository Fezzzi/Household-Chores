import { createAction } from '@reduxjs/toolkit'

export const editSettings = createAction('EDIT_SETTINGS')
export const settingsDataUpdated = createAction('SETTINGS_DATA_UPDATED')

export const connectionAction = createAction('CONNECTION_ACTION')
export const searchConnectionAction = createAction('SEARCH_CONNECTION_ACTION')
export const connectionRequest = createAction('CONNECTION_REQUEST')
export const connectionRequestSuccess = createAction('CONNECTION_REQUEST_SUCCESS')

export const loadSettings = createAction('LOAD_SETTINGS')
export const loadSettingsSuccess = createAction('LOAD_SETTINGS_SUCCESS')
