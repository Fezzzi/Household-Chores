import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { COLORS } from 'clientSrc/constants'
import {
  connectionApprove, connectionBlock, connectionIgnore, connectionRemove, connectionUnblock,
} from 'clientSrc/effects/conectionEffects'
import { SettingsActions } from 'clientSrc/actions'
import { CONNECTION_STATE_TYPE, SETTING_TABS } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'

const tabButtons = {
  [SETTING_TABS.MY_CONNECTIONS]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_REMOVE],
  [SETTING_TABS.FIND_CONNECTION]: [FORM.CONNECTION_CONNECT],
  [SETTING_TABS.PENDING]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_APPROVE, FORM.CONNECTION_IGNORE],
  [SETTING_TABS.BLOCKED]: [FORM.CONNECTION_UNBLOCK],
}

export const useConnectionButtons = (tab, { state, id: targetId }) => {
  const requestSent = state && state === CONNECTION_STATE_TYPE.WAITING

  const isButtonActive = label => Boolean(tabButtons[tab].find(btn => btn === label))

  const dispatch = useDispatch()

  const connectHandler = useCallback(message =>
    dispatch(SettingsActions.connectionRequest({ targetId, message })),
  [dispatch])

  const getHandler = effect =>
    useCallback(() => dispatch(SettingsActions.connectionAction({ effect, targetId })), [dispatch])

  const blockHandler = getHandler(connectionBlock)
  const approveHandler = getHandler(connectionApprove)
  const ignoreHandler = getHandler(connectionIgnore)
  const unblockHandler = getHandler(connectionUnblock)
  const removeHandler = getHandler(connectionRemove)

  // The order buttons are returned in decides the order they will be displayed in
  return {
    [FORM.CONNECTION_CONNECT]: {
      active: isButtonActive(FORM.CONNECTION_CONNECT),
      disabled: requestSent,
      message: requestSent && FORM.CONNECTION_SENT,
      background: COLORS.BLUE_PRIMARY,
      backgroundHover: COLORS.BLUE_SECONDARY,
      clickHandler: connectHandler,
    },
    [FORM.CONNECTION_APPROVE]: {
      active: isButtonActive(FORM.CONNECTION_APPROVE),
      disabled: false,
      background: COLORS.BLUE_PRIMARY,
      backgroundHover: COLORS.BLUE_SECONDARY,
      clickHandler: approveHandler,
    },
    [FORM.CONNECTION_IGNORE]: {
      active: isButtonActive(FORM.CONNECTION_IGNORE),
      disabled: false,
      color: COLORS.FONT,
      background: COLORS.LIGHT_PRIMARY,
      backgroundHover: COLORS.LIGHT_SECONDARY,
      clickHandler: ignoreHandler,
    },
    [FORM.CONNECTION_REMOVE]: {
      active: isButtonActive(FORM.CONNECTION_REMOVE),
      disabled: false,
      color: COLORS.FONT,
      background: COLORS.LIGHT_PRIMARY,
      backgroundHover: COLORS.LIGHT_SECONDARY,
      clickHandler: removeHandler,
    },
    [FORM.CONNECTION_BLOCK]: {
      active: isButtonActive(FORM.CONNECTION_BLOCK),
      disabled: false,
      background: COLORS.RED_PRIMARY,
      backgroundHover: COLORS.RED_SECONDARY,
      clickHandler: blockHandler,
    },
    [FORM.CONNECTION_UNBLOCK]: {
      active: isButtonActive(FORM.CONNECTION_UNBLOCK),
      disabled: false,
      background: COLORS.GREEN_PRIMARY,
      backgroundHover: COLORS.RED_SECONDARY,
      clickHandler: unblockHandler,
    },
  }
}
