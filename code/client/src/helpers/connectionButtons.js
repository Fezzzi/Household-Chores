import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { COLORS } from 'clientSrc/constants'
import {
  connectionApprove, connectionBlock, connectionIgnore, connectionRemove, connectionUnblock,
} from 'clientSrc/effects/conectionEffects'
import { SettingsActions } from 'clientSrc/actions'
import { CONNECTION_STATE_TYPE, SETTING_TABS } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'

export const useConnectionButtons = (tab, { state, id: targetId }) => {
  const requestSent = state && state === CONNECTION_STATE_TYPE.WAITING

  const dispatch = useDispatch()

  const connectHandler = useCallback(message =>
    dispatch(SettingsActions.connectionRequest({ targetId, message })),
  [dispatch])

  // The order buttons are returned in decides the order they will be displayed in
  return {
    [FORM.CONNECTION_CONNECT]: {
      message: requestSent && FORM.CONNECTION_SENT,
      background: COLORS.BLUE_PRIMARY,
      backgroundHover: COLORS.BLUE_SECONDARY,
    },
    [FORM.CONNECTION_APPROVE]: {
      background: COLORS.BLUE_PRIMARY,
      backgroundHover: COLORS.BLUE_SECONDARY,
    },
    [FORM.CONNECTION_IGNORE]: {
      color: COLORS.FONT,
      background: COLORS.LIGHT_PRIMARY,
      backgroundHover: COLORS.LIGHT_SECONDARY,
    },
    [FORM.CONNECTION_REMOVE]: {
      color: COLORS.FONT,
      background: COLORS.LIGHT_PRIMARY,
      backgroundHover: COLORS.LIGHT_SECONDARY,
    },
    [FORM.CONNECTION_BLOCK]: {
      background: COLORS.RED_PRIMARY,
      backgroundHover: COLORS.RED_SECONDARY,
    },
    [FORM.CONNECTION_UNBLOCK]: {
      background: COLORS.GREEN_PRIMARY,
      backgroundHover: COLORS.RED_SECONDARY,
    },
  }
}
