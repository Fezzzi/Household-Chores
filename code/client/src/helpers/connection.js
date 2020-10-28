import {
  connectionApprove, connectionBlock, connectionIgnore, connectionRemove, connectionRequest, connectionUnblock,
} from 'clientSrc/effects/conectionEffects';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR, FORM } from 'shared/constants/localeMessages';

export const useConnectionButtonHandlers = (user, setData, setButtons, addNotification) => {
  const { id } = user;

  const switchingHandler = (promiseFunc, removeKey, pushKey) => () => promiseFunc({ id })
    .then(({ data: { success } }) => success && setData(prevData => ({
      ...prevData,
      [removeKey]: prevData[removeKey].filter(({ id: userId }) => id !== userId),
      [pushKey]: [...prevData[pushKey], user],
    })))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const removingHandler = (promiseFunc, removeKey) => () => promiseFunc({ id })
    .then(({ data: { success } }) => success && setData(prevData => ({
      ...prevData,
      [removeKey]: prevData[removeKey].filter(({ id: userId }) => id !== userId),
    })))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const connectHandler = message => () => connectionRequest({ id, message })
    .then(({ data: { success } }) => {
      if (success) {
        setButtons(prevState => ({
          ...prevState,
          [FORM.CONNECTION_CONNECT]: {
            active: true,
            disabled: true,
            message: FORM.CONNECTION_SENT,
            clickHandler: () => {
            },
          },
        }));
        setData(prevData => ({
          ...prevData,
          [CONNECTION_STATE_TYPE.FOUND]: [
            ...prevData[CONNECTION_STATE_TYPE.FOUND].filter(({ id: userId }) => id !== userId),
            {
              ...user,
              message,
              state: CONNECTION_STATE_TYPE.WAITING,
            },
          ],
        }));
      }
    })
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const blockHandler = () => () => connectionBlock({ id })
    .then(({ data: { success } }) => success && setData(prevData => ({
      ...prevData,
      [CONNECTION_STATE_TYPE.APPROVED]: prevData[CONNECTION_STATE_TYPE.APPROVED].filter(({ id: userId }) => id !== userId),
      [CONNECTION_STATE_TYPE.WAITING]: prevData[CONNECTION_STATE_TYPE.WAITING].filter(({ id: userId }) => id !== userId),
      [CONNECTION_STATE_TYPE.BLOCKED]: [...prevData[CONNECTION_STATE_TYPE.BLOCKED], user],
    })))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const approveHandler = () => switchingHandler(connectionApprove, CONNECTION_STATE_TYPE.WAITING, CONNECTION_STATE_TYPE.APPROVED);
  const ignoreHandler = () => removingHandler(connectionIgnore, CONNECTION_STATE_TYPE.WAITING);
  const unblockHandler = () => removingHandler(connectionUnblock, CONNECTION_STATE_TYPE.BLOCKED);
  const removeHandler = () => removingHandler(connectionRemove, CONNECTION_STATE_TYPE.APPROVED);

  return {
    connectHandler,
    blockHandler,
    approveHandler,
    ignoreHandler,
    unblockHandler,
    removeHandler,
  };
};
