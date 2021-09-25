export enum SETTING_COLUMNS {
  CATEGORY = 'category',
  TAB = 'tab',
}

export enum SETTING_CATEGORIES {
  PROFILE = 'profile',
  CONNECTIONS = 'connections',
  HOUSEHOLDS = 'households',
  MORE = 'more',
}

const categories = Object.values(SETTING_CATEGORIES)
export const isSettingCategory = (category: string): category is SETTING_CATEGORIES =>
  categories.includes(category as any)

export enum CONNECTION_TABS {
  FIND_CONNECTION = 'findConnection',
  MY_CONNECTIONS = 'myConnections',
  PENDING = 'pending',
  BLOCKED = 'blocked',
}

export enum PROFILE_TABS {
  GENERAL = 'general',
  NOTIFICATIONS = 'notifications',
  DIALOGS = 'dialogs',
}

export enum HOUSEHOLD_TABS {
  NEW_HOUSEHOLD = 'newHousehold',
  INVITATIONS = 'invitations',
  _HOUSEHOLD = 'household',
}

export enum MORE_TABS {
  ABOUT = 'about',
  SUPPORT = 'support',
  CONTRIBUTE = 'contribute',
}

export const SETTING_TAB_ROWS = {
  [SETTING_CATEGORIES.PROFILE]: Object.values(PROFILE_TABS),
  [SETTING_CATEGORIES.CONNECTIONS]: Object.values(CONNECTION_TABS),
  [SETTING_CATEGORIES.HOUSEHOLDS]: [HOUSEHOLD_TABS.NEW_HOUSEHOLD, HOUSEHOLD_TABS.INVITATIONS],
  [SETTING_CATEGORIES.MORE]: Object.values(MORE_TABS),
}
