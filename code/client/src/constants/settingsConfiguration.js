import * as SettingTypes from 'shared/constants/settingTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';

import { renderFormFromConfig } from 'clientSrc/helpers/settings';

export const formRenderers = {
  [SettingTypes.CATEGORIES.PROFILE]: {
    [SettingTypes.TABS.GENERAL]: () => renderFormFromConfig(settings.PROFILE.GENERAL),
    [SettingTypes.TABS.NOTIFICATIONS]: () => renderFormFromConfig(settings.PROFILE.NOTIFICATIONS),
    [SettingTypes.TABS.CONNECTIONS]: () => renderFormFromConfig(settings.PROFILE.CONNECTIONS),
  },
  [SettingTypes.CATEGORIES.GROUPS]: {
    [SettingTypes.TABS.GENERAL]: () => renderFormFromConfig(settings.GROUPS.GENERAL),
    [SettingTypes.TABS._GROUP]: () => renderFormFromConfig(settings.GROUPS._GROUP),
  },
};

const settings = {
  PROFILE: {
    GENERAL: [
      [
        { name: 'photo', message: FORM.PHOTO, type: InputTypes.IMAGE }
      ],
      [
        { name: 'nickname', message: FORM.NICKNAME, type: InputTypes.TEXT },
        { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
      ],
      [
        { name: 'old-password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
        { name: 'new-password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
      ],
    ],
    NOTIFICATIONS: [
      'b'
    ],
    CONNECTIONS: [
      'c'
    ],
  },
  GROUPS: {
    GENERAL: [
      'd'
    ],
    _GROUP: [
      'e'
    ],
  },
};
