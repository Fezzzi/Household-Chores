import { createReducer } from '@reduxjs/toolkit'

import { DialogActions } from 'clientSrc/actions'
import { DIALOG_KEYS } from 'shared/constants/settingsDataKeys'

const initialState = {
  [DIALOG_KEYS.TUTORIAL]: false,
  [DIALOG_KEYS.HOUSEHOLD_USER_DELETING]: false,
}

const loadDialogSettings = (state, { payload: settings }) => ({
  ...state,
  ...settings,
})

const disableDialog = (state, { payload: dialog }) => ({
  ...state,
  [dialog]: true,
})

export default createReducer(initialState, {
  [DialogActions.loadDialogSettings.toString()]: loadDialogSettings,
  [DialogActions.disableDialog.toString()]: disableDialog,
})
