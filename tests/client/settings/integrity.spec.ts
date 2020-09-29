import { assert } from 'chai';

import * as SettingTypes from 'shared/constants/settingTypes';
import { SETTINGS } from 'shared/constants/localeMessages';
import { AVAILABLE_LOCALES } from 'shared/constants/locale';
import { settingsRenderers } from 'clientSrc/constants/settingsRenderers';
import applicationTexts from '~/code/client/locales';


describe('Settings > integrity', () => {
  describe('Form configuration integrity test', () => {
    const categories = Object.values(SettingTypes.CATEGORIES);
    it('each category and tab has its form renderer', () => {
      categories.forEach(category => {
        const tabs = SettingTypes.TAB_ROWS[category];
        if (!tabs) {
          assert.fail(`missing tab configuration for category ${category} in SettingTypes!`);
        }

        if (tabs.find(tab => !settingsRenderers[category][tab])) {
          assert.fail(`missing form renderer for SettingTypes TAB of category ${category}!`);
        }
      });

      assert.ok('OK');
    });
  });

  describe('Form translations integrity test', () => {
    it('no missing translations of settings', () => {
      const keys = Object.values(SETTINGS);

      AVAILABLE_LOCALES.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any;
        if (keys.find(key => !localeTexts[key])) {
          assert.fail(`missing setting translations for 'AVAILABLE_LOCALE' ${locale}!`);
        }
      });

      assert.ok('OK');
    });
  });
});
