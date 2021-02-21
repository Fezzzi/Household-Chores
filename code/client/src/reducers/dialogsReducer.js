import { createReducer } from '@reduxjs/toolkit'

import { DialogActions } from 'clientSrc/actions'

const initialState = {
  tutorial: false,
  householdMemberDeleting: false,
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
