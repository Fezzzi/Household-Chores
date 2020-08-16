import React from 'react';
import {
  Person, PersonAdd, Group, Settings, NotificationsActive,
} from '@material-ui/icons';

import { CATEGORIES, TABS } from 'shared/constants/settingTypes';

export const CATEGORY_ICONS = {
  [CATEGORIES.PROFILE]: <Person />,
  [CATEGORIES.GROUPS]: <Group />,
};

export const TAB_ICONS ={
  [TABS.CONNECTIONS]: <PersonAdd />,
  [TABS.NOTIFICATIONS]: <NotificationsActive />,
  [TABS.GENERAL]: <Settings />,
};
