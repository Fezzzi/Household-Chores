import { createAction } from '@reduxjs/toolkit'

export const deleteAccount = createAction('DELETE_ACCOUNT')

export const editSettings = createAction('EDIT_SETTINGS')
export const settingsDataUpdated = createAction('SETTINGS_DATA_UPDATED')

export const loadSettings = createAction('LOAD_SETTINGS')
export const loadSettingsSuccess = createAction('LOAD_SETTINGS_SUCCESS')
