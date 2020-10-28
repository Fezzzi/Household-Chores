import { useConnectionButtonHandlers } from 'clientSrc/helpers/connection';
import { FORM } from 'shared/constants/localeMessages';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { TABS } from 'shared/constants/settingTypes';

const tabButtons = {
  [TABS.MY_CONNECTIONS]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_REMOVE],
  [TABS.FIND_CONNECTION]: [FORM.CONNECTION_CONNECT],
  [TABS.PENDING]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_APPROVE, FORM.CONNECTION_IGNORE],
  [TABS.BLOCKED]: [FORM.CONNECTION_UNBLOCK],
};

export const useConnectionButtons = (tab, user, setData, setButtons, addNotification) => {
  const requestSent = user.state && user.state === CONNECTION_STATE_TYPE.WAITING;

  const isButtonActive = label => Boolean(tabButtons[tab].find(btn => btn === label));

  const {
    connectHandler, approveHandler, blockHandler, ignoreHandler, removeHandler, unblockHandler,
  } = useConnectionButtonHandlers(user, setData, setButtons, addNotification);

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
  };
};
