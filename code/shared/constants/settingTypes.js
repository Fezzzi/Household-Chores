export const COLUMNS = {
  CATEGORY: 'category',
  TAB: 'tab',
};

export const CATEGORIES = {
  PROFILE: 'profile',
  GROUPS: 'groups',
};

export const TABS = {
  GENERAL: 'general',
  CONNECTIONS: 'connections',
  NOTIFICATIONS: 'notifications',
  _GROUP: 'group',
};

export const TAB_ROWS = {
  [CATEGORIES.PROFILE]: [TABS.GENERAL, TABS.CONNECTIONS, TABS.NOTIFICATIONS],
  [CATEGORIES.GROUPS]: [TABS.GENERAL],
};
