import HOUSEHOLDS_TABLE from 'serverSrc/database/models/tables/households';
import * as SettingTypes from 'shared/constants/settingTypes';
import { CATEGORIES, TABS } from 'shared/constants/settingTypes';

export const getCategoryList = (data: object): { categories: string[]; messages: object; types: object } => ({
  categories: [
    ...Object.values(SettingTypes.CATEGORIES),
    'new-category',
  ],
  messages: {
    'new-category': 'NEW CATEGORY',
  },
  types: {
    'new-category': CATEGORIES.PROFILE,
  },
});

export const getTabList = (data: any, category: string): { tabs: string[]; messages: object; types: object } => {
  switch (category) {
    case CATEGORIES.HOUSEHOLDS: return {
      tabs: [
        ...SettingTypes.TAB_ROWS[category],
        ...data.households.map((household: any) => `${TABS._HOUSEHOLD}-${household[HOUSEHOLDS_TABLE.columns.id]}`),
      ],
      messages: Object.fromEntries(
        data.households.map((household: any) => [
          `${TABS._HOUSEHOLD}-${household[HOUSEHOLDS_TABLE.columns.id]}`,
          household[HOUSEHOLDS_TABLE.columns.name],
        ]),
      ),
      types: Object.fromEntries(
        data.households.map((household: any) => [
          `${TABS._HOUSEHOLD}-${household[HOUSEHOLDS_TABLE.columns.id]}`,
          TABS._HOUSEHOLD,
        ]),
      ),
    };
    default: return { tabs: SettingTypes.TAB_ROWS[category], messages: {}, types: {} };
  }
};
