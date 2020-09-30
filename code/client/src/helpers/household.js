import { invitationApprove, invitationIgnore } from 'clientSrc/effects/householdEffects';
import { ERROR } from 'shared/constants/localeMessages';
import * as NotificationTypes from 'shared/constants/notificationTypes';

export const useHouseholdButtonHandlers = (householdId, fromId, setData, addNotification) => {
  const approveHandler = () => invitationApprove({ householdId, fromId, photo: '' })
    .then(({ data: { success, data } }) => success && setData(data))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const removeHandler = () => invitationIgnore({ householdId, fromId })
    .then(({ data: { success } }) => success && setData(prevData => ({
      ...prevData,
      invitations: prevData.invitations.filter(({ id_household: idHousehold, from: { id } }) =>
        idHousehold !== householdId && id !== fromId
      ),
    })))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  return {
    approveHandler,
    removeHandler,
  };
};
