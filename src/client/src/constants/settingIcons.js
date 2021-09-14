import { SETTING_CATEGORIES, CONNECTION_TABS, HOUSEHOLD_TABS, PROFILE_TABS, MORE_TABS } from 'shared/constants'
import {
  PlusIcon, PersonIcon, PersonAddIcon, PersonAddOutlinedIcon, PersonAddDisabledIcon, ConnectionsIcon, SettingsIcon,
  HomeIcon, HomeOutlinedIcon, HouseIcon, HelpIcon, DialogIcon, MoneyIcon, BellIcon, CodeIcon, MoreHorizIcon,
} from 'clientSrc/styles/icons'

export const CATEGORY_ICONS = {
  [SETTING_CATEGORIES.PROFILE]: PersonIcon,
  [SETTING_CATEGORIES.CONNECTIONS]: ConnectionsIcon,
  [SETTING_CATEGORIES.HOUSEHOLDS]: HouseIcon,
  [SETTING_CATEGORIES.MORE]: MoreHorizIcon,
}

export const TAB_ICONS = {
  [PROFILE_TABS.NOTIFICATIONS]: BellIcon,
  [PROFILE_TABS.GENERAL]: SettingsIcon,
  [PROFILE_TABS.DIALOGS]: DialogIcon,
  [CONNECTION_TABS.MY_CONNECTIONS]: ConnectionsIcon,
  [CONNECTION_TABS.FIND_CONNECTION]: PersonAddIcon,
  [CONNECTION_TABS.PENDING]: PersonAddOutlinedIcon,
  [CONNECTION_TABS.BLOCKED]: PersonAddDisabledIcon,
  [HOUSEHOLD_TABS.INVITATIONS]: HomeOutlinedIcon,
  [HOUSEHOLD_TABS.NEW_HOUSEHOLD]: PlusIcon,
  [HOUSEHOLD_TABS._HOUSEHOLD]: HomeIcon,
  [MORE_TABS.ABOUT]: HelpIcon,
  [MORE_TABS.SUPPORT]: MoneyIcon,
  [MORE_TABS.CONTRIBUTE]: CodeIcon,
}
