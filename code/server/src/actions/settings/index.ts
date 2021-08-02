import express from 'express'
import dotenv from 'dotenv'

import { ERROR, INFO } from 'shared/constants/localeMessages'
import {
  SETTING_CATEGORIES, SETTING_TAB_ROWS, NOTIFICATION_TYPE, PROFILE_TABS, HOUSEHOLD_TABS, AVAILABLE_LOCALES, API,
} from 'shared/constants'
import { updateUserLocale } from 'serverSrc/database'

import {
  DialogEditInputs, GeneralEditInputs, HouseholdEditInputs, NotificationEditInputs, SettingsUpdateRequestInputs,
} from './types'
import {
  handleDialogsEdit, handleGeneralEdit, handleHouseholdEdit, handleNotificationsEdit, handleSettingsDataFetch,
} from './handlers'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get(/.*/, (req: { query: { category: string; tab: string }}, res) => {
    const { query: { category, tab } } = req
    if (Object.values(SETTING_CATEGORIES).find(cat => cat === category) !== null) {
      handleSettingsDataFetch(category, tab, req, res)
      return
    }

    res.status(204).send()
  })

  router.put('/:action', async (req: any, res) => {
    const { params: { action }, body } = req

    if (action === API.CHANGE_LOCALE) {
      const { locale } = body

      if (locale && AVAILABLE_LOCALES.includes(locale as string) && req.session?.userId) {
        await updateUserLocale(req.session.userId, locale)
        res.status(204).send()
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
      }
    } else {
      const { category, tab, inputs } = body

      if (inputs && Object.values(inputs).length > 0) {
        if (category && tab && SETTING_TAB_ROWS[category] !== undefined) {
          const handled = await editSettings(category, tab, inputs, req, res)
          if (!handled) {
            handleSettingsDataFetch(category, tab, req, res)
          }
        } else {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
        }
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
      }
    }
  })

  return router
}

const editSettings = (category: string, tab: string, inputs: SettingsUpdateRequestInputs, req: any, res: any) => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      switch (tab) {
        case PROFILE_TABS.GENERAL:
          return handleGeneralEdit(inputs as GeneralEditInputs, req, res)
        case PROFILE_TABS.NOTIFICATIONS:
          return handleNotificationsEdit(inputs as NotificationEditInputs, req, res)
        case PROFILE_TABS.DIALOGS:
          return handleDialogsEdit(inputs as DialogEditInputs, req, res)
      }
      break
    case SETTING_CATEGORIES.HOUSEHOLDS:
      if (tab === HOUSEHOLD_TABS._HOUSEHOLD) {
        return handleHouseholdEdit(inputs as HouseholdEditInputs, req, res)
      }
      break
  }
  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
  return true
}
