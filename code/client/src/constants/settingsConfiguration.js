import React from 'react';
import * as SettingTypes from 'shared/constants/settingTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';

import { renderFormFromConfig } from 'clientSrc/helpers/settings';
import { ThemeSwitch, LocaleSwitch } from 'clientSrc/components/forms';

const settings = {
  PROFILE: {
    GENERAL: [
      [
        {
          name: 'photo',
          message: FORM.SELECT_PHOTO,
          type: InputTypes.PHOTO,
          dataKey: 'photo',
        }
      ], [
        {
          name: 'nickname',
          message: FORM.NEW_NICKNAME,
          label: FORM.NICKNAME,
          type: InputTypes.TEXT,
          dataKey: 'name',
        }, {
          name: 'email',
          message: FORM.NEW_EMAIL,
          label: FORM.EMAIL,
          type: InputTypes.EMAIL,
          dataKey: 'email',
        },
      ], [
        {
          name: 'old-password',
          message: FORM.OLD_PASSWORD,
          type: InputTypes.PASSWORD,
        }, {
          name: 'new-password',
          message: FORM.NEW_PASSWORD,
          type: InputTypes.PASSWORD,
        },
      ], [
        {
          name: 'language',
          label: FORM.LANGUAGE,
          type: InputTypes.CUSTOM,
          body: <LocaleSwitch />,
          fixed: true,
          half: true,
        }, {
          name: 'theme',
          label: FORM.THEME,
          type: InputTypes.CUSTOM,
          body: <ThemeSwitch />,
          fixed: true,
          half: true,
        },
      ],
    ],
    NOTIFICATIONS: [
      [
        { name: 'notifications', label: FORM.NOTIFICATIONS, type: InputTypes.SWITCH, dataKey: 'notifications', fixed: true },
      ],
    ],
    CONNECTIONS: [
      [
        { name: 'notifications', label: FORM.NOTIFICATIONS, type: InputTypes.SWITCH, dataKey: 'notifications', fixed: true, half: true  },
        { name: 'notifications', label: FORM.NOTIFICATIONS, type: InputTypes.SWITCH, dataKey: 'notifications', fixed: true, half: true  },
      ],
      [
        { name: 'old-password', message: FORM.OLD_PASSWORD, type: InputTypes.PASSWORD },
        { name: 'new-password', message: FORM.NEW_PASSWORD, type: InputTypes.PASSWORD },
      ],
      [
        { name: 'language', label: FORM.LANGUAGE, type: InputTypes.CUSTOM, body: <LocaleSwitch />, fixed: true, half: true },
        { name: 'theme', label: FORM.THEME, type: InputTypes.CUSTOM, body: <ThemeSwitch />, fixed: true, half: true },
      ],
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

export const formRenderers = {
  [SettingTypes.CATEGORIES.PROFILE]: {
    [SettingTypes.TABS.GENERAL]: renderFormFromConfig(settings.PROFILE.GENERAL),
    [SettingTypes.TABS.NOTIFICATIONS]: renderFormFromConfig(settings.PROFILE.NOTIFICATIONS),
    [SettingTypes.TABS.CONNECTIONS]: renderFormFromConfig(settings.PROFILE.CONNECTIONS),
  },
  [SettingTypes.CATEGORIES.GROUPS]: {
    [SettingTypes.TABS.GENERAL]: renderFormFromConfig(settings.GROUPS.GENERAL),
    [SettingTypes.TABS._GROUP]: renderFormFromConfig(settings.GROUPS._GROUP),
  },
};
