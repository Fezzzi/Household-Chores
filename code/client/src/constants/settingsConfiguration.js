import React from 'react';
import * as SettingTypes from 'shared/constants/settingTypes';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';

import { ThemeSwitch, LocaleSwitch } from 'clientSrc/components/forms';

const HALF_WIDTH = 190;

export const settingsConfiguration = {
  [SettingTypes.CATEGORIES.PROFILE]: {
    [SettingTypes.TABS.GENERAL]: [
      [
        {
          name: 'photo',
          message: FORM.SELECT_PHOTO,
          type: InputTypes.PHOTO,
          dataKey: 'photo',
        },
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
        [
          {
            name: 'language',
            label: FORM.LANGUAGE,
            type: InputTypes.CUSTOM,
            body: <LocaleSwitch />,
            fixedProps: { maxWidth: HALF_WIDTH },
          }, {
            name: 'theme',
            label: FORM.THEME,
            type: InputTypes.CUSTOM,
            body: <ThemeSwitch />,
            fixedProps: { maxWidth: HALF_WIDTH },
          },
        ],
      ],
    ],
    [SettingTypes.TABS.NOTIFICATIONS]: [
      [
        {
          name: 'notifications',
          label: FORM.NOTIFICATIONS,
          type: InputTypes.SWITCH,
          dataKey: 'notifications',
        },
      ],
    ],
  },
  'new-category': { [SettingTypes.TABS.GENERAL]: [[]] },
};
