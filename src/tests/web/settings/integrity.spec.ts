import { assert } from 'chai'

import applicationTexts from 'shared/locales'
import { SETTINGS } from 'shared/constants/localeMessages'
import { AVAILABLE_LOCALES, SETTING_CATEGORIES, SETTING_TAB_ROWS } from 'shared/constants'
import { settingsRenderers } from 'web/helpers/settingsRenderers'

describe('Settings > integrity', () => {
  describe('Form configuration integrity test', () => {
    const categories = Object.values(SETTING_CATEGORIES)
    it('each category and tab has its form renderer', () => {
      categories.forEach(category => {
        const tabs = SETTING_TAB_ROWS[category]
        if (!tabs) {
          assert.fail(`missing tab configuration for category ${category} in SettingTypes!`)
        }

        if (tabs.find(tab => !settingsRenderers[category][tab])) {
          assert.fail(`missing form renderer for SettingTypes TAB of category ${category}!`)
        }
      })

      assert.ok('OK')
    })
  })

  describe('Form translations integrity test', () => {
    it('no missing translations of settings', () => {
      const keys = Object.values(SETTINGS)

      AVAILABLE_LOCALES.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any
        if (keys.find(key => !localeTexts[key])) {
          assert.fail(`missing setting translations for 'AVAILABLE_LOCALE' ${locale}!`)
        }
      })

      assert.ok('OK')
    })
  })
})
