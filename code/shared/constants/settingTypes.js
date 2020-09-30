export const COLUMNS = {
  CATEGORY: 'category',
  TAB: 'tab',
};

export const CATEGORIES = {
  PROFILE: 'profile',
  CONNECTIONS: 'connections',
  HOUSEHOLDS: 'households',
};

export const TABS = {
  GENERAL: 'general',
  NOTIFICATIONS: 'notifications',

  MY_CONNECTIONS: 'myConnections',
  FIND_CONNECTION: 'findConnection',
  PENDING: 'pending',
  BLOCKED: 'blocked',

  NEW_HOUSEHOLD: 'newHousehold',
  INVITATIONS: 'invitations',
  _HOUSEHOLD: 'household',
};

export const TAB_ROWS = {
  [CATEGORIES.PROFILE]: [TABS.GENERAL, TABS.NOTIFICATIONS],
  [CATEGORIES.CONNECTIONS]: [TABS.MY_CONNECTIONS, TABS.FIND_CONNECTION, TABS.PENDING, TABS.BLOCKED],
  [CATEGORIES.HOUSEHOLDS]: [TABS.NEW_HOUSEHOLD, TABS.INVITATIONS],
  'new-category': [TABS.GENERAL],
};
