import { assert } from 'chai';

// import * as SettingTypes from 'shared/constants/settingTypes';
import { SETTINGS } from 'shared/constants/localeMessages';
import { AVAILABLE_LOCALES } from 'shared/constants/locale';
// import { settingsConfiguration } from 'clientSrc/constants/settingsConfiguration';
import applicationTexts from '~/code/client/locales';


describe('Settings > integrity', () => {
  /* todo: Fix mocha to use webpack and successfully load png files in components
  describe('Form configuration integrity test', () => {
    if (Object.keys(SettingTypes.CATEGORIES).find(category => !settingsConfiguration[category])) {
      assert.fail('missing form configuration for SettingTypes CATEGORIES!');
    }

    const categories = Object.keys(SettingTypes.CATEGORIES);
    it('each category and tab has its form configuration', () => {
      categories.forEach(category => {
        const tabs = SettingTypes.TAB_ROWS[category];
        if (!tabs) {
          assert.fail(`missing tabs configuration for category ${category} in SettingTypes!`);
        }

        if (tabs.find(tab => !settingsConfiguration[category][tab])) {
          assert.fail('missing form configuration for SettingTypes TAB!');
        }
      });

      assert.ok('OK');
    });
  });
   */

  describe('Form translations integrity test', () => {
    it('no missing translations of settings', () => {
      const keys = Object.values(SETTINGS);

      AVAILABLE_LOCALES.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any;
        if (keys.find(key => !localeTexts[key])) {
          assert.fail(`missing setting translations for 'AVAILABLE_LOCALE' ${ locale }!`);
        }
      });

      assert.ok('OK');
    });
  });
});
