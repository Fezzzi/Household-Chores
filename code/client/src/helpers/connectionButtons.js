import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import {
  connectionApprove, connectionBlock, connectionIgnore, connectionRemove, connectionUnblock,
} from 'clientSrc/effects/conectionEffects'
import * as SettingsActions from 'clientSrc/actions/settingsActions'
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType'
import { FORM } from 'shared/constants/localeMessages'
import { TABS } from 'shared/constants/settingTypes'

const tabButtons = {
  [TABS.MY_CONNECTIONS]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_REMOVE],
  [TABS.FIND_CONNECTION]: [FORM.CONNECTION_CONNECT],
  [TABS.PENDING]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_APPROVE, FORM.CONNECTION_IGNORE],
  [TABS.BLOCKED]: [FORM.CONNECTION_UNBLOCK],
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
      background: 'var(--cBluePrimary)',
      backgroundHover: 'var(--cBlueSecondary)',
      clickHandler: connectHandler,
    },
    [FORM.CONNECTION_APPROVE]: {
      active: isButtonActive(FORM.CONNECTION_APPROVE),
      disabled: false,
      background: 'var(--cBluePrimary)',
      backgroundHover: 'var(--cBlueSecondary)',
      clickHandler: approveHandler,
    },
    [FORM.CONNECTION_IGNORE]: {
      active: isButtonActive(FORM.CONNECTION_IGNORE),
      disabled: false,
      color: 'var(--cFont)',
      background: 'var(--cLightPrimary)',
      backgroundHover: 'var(--cLightSecondary)',
      clickHandler: ignoreHandler,
    },
    [FORM.CONNECTION_REMOVE]: {
      active: isButtonActive(FORM.CONNECTION_REMOVE),
      disabled: false,
      color: 'var(--cFont)',
      background: 'var(--cLightPrimary)',
      backgroundHover: 'var(--cLightSecondary)',
      clickHandler: removeHandler,
    },
    [FORM.CONNECTION_BLOCK]: {
      active: isButtonActive(FORM.CONNECTION_BLOCK),
      disabled: false,
      background: 'var(--cRedPrimary)',
      backgroundHover: 'var(--cRedSecondary)',
      clickHandler: blockHandler,
    },
    [FORM.CONNECTION_UNBLOCK]: {
      active: isButtonActive(FORM.CONNECTION_UNBLOCK),
      disabled: false,
      background: 'var(--cGreenPrimary)',
      backgroundHover: 'var(--cGreenSecondary)',
      clickHandler: unblockHandler,
    },
  }
}
