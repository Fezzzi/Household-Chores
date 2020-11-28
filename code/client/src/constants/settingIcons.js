import React from 'react'
import {
  Add, Home, HomeOutlined, Person, PersonAdd, PersonAddOutlined, PersonAddDisabled, Group, House, Settings, NotificationsActive,
} from '@material-ui/icons'

import { CATEGORIES, TABS } from 'shared/constants/settingTypes'

export const CATEGORY_ICONS = {
  [CATEGORIES.PROFILE]: <Person />,
  [CATEGORIES.CONNECTIONS]: <Group />,
  [CATEGORIES.HOUSEHOLDS]: <House />,
}

export const TAB_ICONS = {
  [TABS.NOTIFICATIONS]: <NotificationsActive />,
  [TABS.GENERAL]: <Settings />,
  [TABS.MY_CONNECTIONS]: <Group />,
  [TABS.FIND_CONNECTION]: <PersonAdd />,
  [TABS.PENDING]: <PersonAddOutlined />,
  [TABS.BLOCKED]: <PersonAddDisabled />,
  [TABS.INVITATIONS]: <HomeOutlined />,
  [TABS.NEW_HOUSEHOLD]: <Add />,
  [TABS._HOUSEHOLD]: <Home />,
}
