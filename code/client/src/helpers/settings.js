import { settingsRenderers } from 'clientSrc/constants/settingsRenderers';
import { loadSettings } from 'clientSrc/effects/settingsEffects';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';

export const useContentRendererKeys = (category, tab, categoryTypes, tabTypes) => {
  const categoryKey = settingsRenderers[category]
    ? category
    : settingsRenderers[categoryTypes[category]]
      ? categoryTypes[category]
      : null;

  if (categoryKey === null) {
    return { categoryKey, tabKey: null }
  }

  const tabKey = settingsRenderers[categoryKey][tab]
    ? tab
    : settingsRenderers[categoryKey][tabTypes[tab]]
      ? tabTypes[tab]
      : null;

  return {
    categoryKey,
    tabKey,
  };
};

export const useSettingsLoader = loadSettingss => (category, tab, setState, setData, setRenderedTabs, addNotification) => {
  loadSettingss(category, tab);
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
