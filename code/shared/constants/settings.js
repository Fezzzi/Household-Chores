export const SETTING_COLUMNS = {
  CATEGORY: 'category',
  TAB: 'tab',
}

export const SETTING_CATEGORIES = {
  PROFILE: 'profile',
  CONNECTIONS: 'connections',
  HOUSEHOLDS: 'households',
}

export const SETTING_TABS = {
  MY_CONNECTIONS: 'myConnections',
  FIND_CONNECTION: 'findConnection',
  PENDING: 'pending',
  BLOCKED: 'blocked',
}

export const PROFILE_TABS = {
  DIALOGS: 'dialogs',
  GENERAL: 'general',
  NOTIFICATIONS: 'notifications',
}

export const HOUSEHOLD_TABS = {
  NEW_HOUSEHOLD: 'newHousehold',
  INVITATIONS: 'invitations',
  _HOUSEHOLD: 'household',
}

export const SETTING_TAB_ROWS = {
  [SETTING_CATEGORIES.PROFILE]: [
    PROFILE_TABS.GENERAL,
    PROFILE_TABS.DIALOGS,
    PROFILE_TABS.NOTIFICATIONS,
  ],
  [SETTING_CATEGORIES.CONNECTIONS]: [
    SETTING_TABS.MY_CONNECTIONS,
    SETTING_TABS.FIND_CONNECTION,
    SETTING_TABS.PENDING,
    SETTING_TABS.BLOCKED,
  ],
  [SETTING_CATEGORIES.HOUSEHOLDS]: [HOUSEHOLD_TABS.INVITATIONS, HOUSEHOLD_TABS.NEW_HOUSEHOLD],
}
