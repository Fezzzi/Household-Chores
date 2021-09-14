export const SETTING_COLUMNS = {
  CATEGORY: 'category',
  TAB: 'tab',
}

export const SETTING_CATEGORIES = {
  PROFILE: 'profile',
  CONNECTIONS: 'connections',
  HOUSEHOLDS: 'households',
  MORE: 'more',
}

export const CONNECTION_TABS = {
  FIND_CONNECTION: 'findConnection',
  MY_CONNECTIONS: 'myConnections',
  PENDING: 'pending',
  BLOCKED: 'blocked',
}

export const PROFILE_TABS = {
  GENERAL: 'general',
  NOTIFICATIONS: 'notifications',
  DIALOGS: 'dialogs',
}

export const HOUSEHOLD_TABS = {
  NEW_HOUSEHOLD: 'newHousehold',
  INVITATIONS: 'invitations',
  _HOUSEHOLD: 'household',
}

export const MORE_TABS = {
  ABOUT: 'about',
  SUPPORT: 'support',
  CONTRIBUTE: 'contribute',
}

export const SETTING_TAB_ROWS = {
  [SETTING_CATEGORIES.PROFILE]: Object.values(PROFILE_TABS),
  [SETTING_CATEGORIES.CONNECTIONS]: Object.values(CONNECTION_TABS),
  [SETTING_CATEGORIES.HOUSEHOLDS]: [HOUSEHOLD_TABS.NEW_HOUSEHOLD, HOUSEHOLD_TABS.INVITATIONS],
  [SETTING_CATEGORIES.MORE]: Object.values(MORE_TABS),
}
