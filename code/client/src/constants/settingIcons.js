import React from 'react'
import {
  Add, Home, HomeOutlined, Person, PersonAdd, PersonAddOutlined, Announcement,
  PersonAddDisabled, Group, House, Settings, NotificationsActive,
} from '@material-ui/icons'

import { SETTING_CATEGORIES, SETTING_TABS, HOUSEHOLD_TABS, PROFILE_TABS } from 'shared/constants'

export const CATEGORY_ICONS = {
  [SETTING_CATEGORIES.PROFILE]: <Person />,
  [SETTING_CATEGORIES.CONNECTIONS]: <Group />,
  [SETTING_CATEGORIES.HOUSEHOLDS]: <House />,
}

export const TAB_ICONS = {
  [PROFILE_TABS.NOTIFICATIONS]: <NotificationsActive />,
  [PROFILE_TABS.GENERAL]: <Settings />,
  [PROFILE_TABS.DIALOGS]: <Announcement />,
  [SETTING_TABS.MY_CONNECTIONS]: <Group />,
  [SETTING_TABS.FIND_CONNECTION]: <PersonAdd />,
  [SETTING_TABS.PENDING]: <PersonAddOutlined />,
  [SETTING_TABS.BLOCKED]: <PersonAddDisabled />,
  [HOUSEHOLD_TABS.INVITATIONS]: <HomeOutlined />,
  [HOUSEHOLD_TABS.NEW_HOUSEHOLD]: <Add />,
  [HOUSEHOLD_TABS._HOUSEHOLD]: <Home />,
}
