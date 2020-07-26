import { assert } from 'chai';

import { DEFAULT_LOCALE, AVAILABLE_LOCALES } from 'clientSrc/constants/locale';
import applicationTexts from '~/code/client/locales';

describe('Locales > integrity', () => {
  describe('integrity test', () => {
    const defaultLocaleTexts = applicationTexts[DEFAULT_LOCALE] as any;
    if (!defaultLocaleTexts) {
      assert.fail('no texts for default locale found!');
    }

    const groups = Object.keys(defaultLocaleTexts);
    const testedLocales = AVAILABLE_LOCALES.filter(locale => locale !== DEFAULT_LOCALE);

    it('no missing translations of default locale messages', () => {
      testedLocales.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any;
        if (!localeTexts) {
          assert.fail(`no texts for 'AVAILABLE_LOCALE' ${locale} found!`);
        }

        groups.forEach(group => {
          const messages = Object.keys(defaultLocaleTexts[group]);
          if (!localeTexts[group]) {
            assert.fail(`locale ${locale} is missing translations for message group ${group}`);
          }

          messages.forEach(message => {
            if (!localeTexts[group][message]) {
              assert.fail(`locale ${locale} is missing translation for message ${group}.${message}`);
            }
          });
        });
      });
      assert.ok('OK');
    });

    it('no messages missing in default texts', () => {
      testedLocales.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any;
        if (!localeTexts) {
          assert.fail(`no texts for 'AVAILABLE_LOCALE' ${locale} found!`);
        }
        const localeGroups = Object.keys(localeTexts);

        localeGroups.forEach(group => {
          const messages = Object.keys(localeTexts[group]);
          if (!defaultLocaleTexts[group]) {
            assert.fail(`message group ${group} present in locale ${locale} is missing in default locale!`);
          }

          messages.forEach(message => {
            if (!defaultLocaleTexts[group][message]) {
              assert.fail(`message ${group}.${message}present in locale ${locale} is missing in default locale!`);
            }
          });
        });
        assert.ok('OK');
      });
    });
  });
});
