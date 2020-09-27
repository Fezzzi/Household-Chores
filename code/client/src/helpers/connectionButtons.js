import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR, FORM } from 'shared/constants/localeMessages';
import {
  connectionApprove,
  connectionBlock,
  connectionIgnore, connectionRemove,
  connectionRequest, connectionUnblock,
} from 'clientSrc/effects/conectionEffects';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { TABS } from 'shared/constants/settingTypes';

const tabButtons = {
  [TABS.MY_CONNECTIONS]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_REMOVE],
  [TABS.FIND_CONNECTION]: [FORM.CONNECTION_CONNECT],
  [TABS.PENDING]: [FORM.CONNECTION_BLOCK, FORM.CONNECTION_APPROVE, FORM.CONNECTION_IGNORE],
  [TABS.BLOCKED]: [FORM.CONNECTION_UNBLOCK],
};

export const getConnectionsButtonConfig = (tab, user, userData, setData, setButtons, addNotification) => {
  const { id, state } = user;
  const requestSent = state && state === CONNECTION_STATE_TYPE.WAITING;

  const switchingHandler = (promiseFunc, removeKey, pushKey) => () => promiseFunc({ id })
    .then(({ data: { success } }) => success && setData({
      ...userData,
      [removeKey]: userData[removeKey].filter(({ id: userId }) => id !== userId),
      [pushKey]: [...userData[pushKey], user],
    }))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const removingHandler = (promiseFunc, removeKey) => () => promiseFunc({ id })
    .then(({ data: { success } }) => success && setData({
      ...userData,
      [removeKey]: userData[removeKey].filter(({ id: userId }) => id !== userId),
    }))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const connectHandler = message => () => connectionRequest({ id, message })
    .then(({ data: { success } }) => {
      if (success) {
        setButtons(prevState => ({
          ...prevState,
          [FORM.CONNECTION_CONNECT]: { active: true, disabled: true, message: FORM.CONNECTION_SENT, clickHandler: () => {} },
        }));
        setData({
          ...userData,
          [CONNECTION_STATE_TYPE.FOUND]: [
            ...userData[CONNECTION_STATE_TYPE.FOUND].filter(({ id: userId }) => id !== userId),
            {
              ...user,
              message,
              state: CONNECTION_STATE_TYPE.WAITING,
            },
          ],
        });
      }
    })
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const blockHandler = () => () => connectionBlock({ id })
    .then(({ data: { success } }) => success && setData({
      ...userData,
      [CONNECTION_STATE_TYPE.APPROVED]: userData[CONNECTION_STATE_TYPE.APPROVED].filter(({ id: userId }) => id !== userId),
      [CONNECTION_STATE_TYPE.WAITING]: userData[CONNECTION_STATE_TYPE.WAITING].filter(({ id: userId }) => id !== userId),
      [CONNECTION_STATE_TYPE.BLOCKED]: [...userData[CONNECTION_STATE_TYPE.BLOCKED], user],
    }));

  const approveHandler = () => switchingHandler(connectionApprove, CONNECTION_STATE_TYPE.WAITING, CONNECTION_STATE_TYPE.APPROVED);
  const ignoreHandler = () => removingHandler(connectionIgnore, CONNECTION_STATE_TYPE.WAITING);
  const unblockHandler = () => removingHandler(connectionUnblock, CONNECTION_STATE_TYPE.BLOCKED);
  const removeHandler = () => removingHandler(connectionRemove, CONNECTION_STATE_TYPE.APPROVED);

  const isButtonActive = label => Boolean(tabButtons[tab].find(btn => btn === label));

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
