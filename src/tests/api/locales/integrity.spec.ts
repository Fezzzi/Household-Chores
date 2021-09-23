import { assert } from 'chai'

import applicationTexts from 'shared/locales'
import { DEFAULT_LOCALE, AVAILABLE_LOCALES } from 'shared/constants'
import * as MESSAGES from 'shared/constants/localeMessages'

describe('Locales > integrity', () => {
  describe('Integrity test', () => {
    const defaultLocaleTexts = applicationTexts[DEFAULT_LOCALE] as any
    if (!defaultLocaleTexts) {
      assert.fail('no texts for default locale found!')
    }

    it('no missing translations', () => {
      Object.values(MESSAGES).forEach(msgType =>
        Object.values(msgType).forEach(msgKey => {
          if (defaultLocaleTexts[msgKey] == null) {
            assert.fail(`missing translation of key ${msgKey}`)
          }
        })
      )
      assert.ok('OK')
    })

    const keys = Object.keys(defaultLocaleTexts)
    const testedLocales = AVAILABLE_LOCALES.filter(locale => locale !== DEFAULT_LOCALE)

    it('no messages missing in available locales', () => {
      testedLocales.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any
        if (!localeTexts) {
          assert.fail(`no texts for 'AVAILABLE_LOCALE' ${locale} found!`)
        }

        keys.forEach(key => {
          if (localeTexts[key] == null) {
            assert.fail(`locale ${locale} is missing translations for message ${key}`)
          }
        })
      })
      assert.ok('OK')
    })

    it('no messages missing in default texts', () => {
      testedLocales.forEach(locale => {
        const localeTexts = applicationTexts[locale] as any
        if (!localeTexts) {
          assert.fail(`no texts for 'AVAILABLE_LOCALE' ${locale} found!`)
        }
        const localeKeys = Object.keys(localeTexts)

        localeKeys.forEach(key => {
          if (defaultLocaleTexts[key] == null) {
            assert.fail(`message ${key} present in locale ${locale} is missing in default locale!`)
          }
        })
        assert.ok('OK')
      })
    })
  })
})
