import * as SettingTypes from 'shared/constants/settingTypes';

export const getCategoryList = (): { categories: string[]; messages: object } => ({
  categories: [
    ...Object.values(SettingTypes.CATEGORIES),
    'new-category',
  ],
  messages: {
    [`${SettingTypes.COLUMNS.CATEGORY}_new-category`]: 'NEW CATEGORY',
  },
});

export const getTabList = (category: string): { tabs: string[]; messages: object } => ({
  tabs: [
    ...SettingTypes.TAB_ROWS[category],
    'new-tab-1',
    'new-tab-2',
  ],
  messages: {
    [`${SettingTypes.COLUMNS.TAB}_new-tab-1`]: 'NEW TAB 1',
    [`${SettingTypes.COLUMNS.TAB}_new-tab-2`]: 'NEW TAB 2',
  },
});
