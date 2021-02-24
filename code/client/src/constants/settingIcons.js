import React from 'react'
import {
  Add, Home, HomeOutlined, Person, PersonAdd, PersonAddOutlined, Announcement, Code, MoreHoriz,
  PersonAddDisabled, Group, House, Settings, NotificationsActive, HelpOutline, AttachMoney,
} from '@material-ui/icons'

import { SETTING_CATEGORIES, CONNECTION_TABS, HOUSEHOLD_TABS, PROFILE_TABS, MORE_TABS } from 'shared/constants'

export const CATEGORY_ICONS = {
  [SETTING_CATEGORIES.PROFILE]: <Person />,
  [SETTING_CATEGORIES.CONNECTIONS]: <Group />,
  [SETTING_CATEGORIES.HOUSEHOLDS]: <House />,
  [SETTING_CATEGORIES.MORE]: <MoreHoriz />,
}

export const TAB_ICONS = {
  [PROFILE_TABS.NOTIFICATIONS]: <NotificationsActive />,
  [PROFILE_TABS.GENERAL]: <Settings />,
  [PROFILE_TABS.DIALOGS]: <Announcement />,
  [CONNECTION_TABS.MY_CONNECTIONS]: <Group />,
  [CONNECTION_TABS.FIND_CONNECTION]: <PersonAdd />,
  [CONNECTION_TABS.PENDING]: <PersonAddOutlined />,
  [CONNECTION_TABS.BLOCKED]: <PersonAddDisabled />,
  [HOUSEHOLD_TABS.INVITATIONS]: <HomeOutlined />,
  [HOUSEHOLD_TABS.NEW_HOUSEHOLD]: <Add />,
  [HOUSEHOLD_TABS._HOUSEHOLD]: <Home />,
  [MORE_TABS.ABOUT]: <HelpOutline />,
  [MORE_TABS.SUPPORT]: <AttachMoney />,
  [MORE_TABS.CONTRIBUTE]: <Code />,
}
