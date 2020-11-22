import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';

export const useSettingsLoader = loadSettings => (category, tab, setState, setData, setRenderedTabs, addNotification) => {
  loadSettings(category, tab)
    .then(({ data: { tabs: newTabs, data: newData, ...otherData } }) => {
      setState(prevState => ({
        ...prevState,
        tabs: newTabs,
        ...otherData,
      }));
      setData(newData);
      setRenderedTabs(newTabs);
    })
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));
};
