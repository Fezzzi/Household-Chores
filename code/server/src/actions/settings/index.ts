import express from 'express'
import dotenv from 'dotenv'

import * as SettingTypes from 'shared/constants/settingTypes'
import { handleSettingsDataFetch, handleSettingsDataUpdate } from 'serverSrc/actions/settings/handlers'
import * as NotificationTypes from 'shared/constants/notificationTypes'
import { ERROR, INFO } from 'shared/constants/localeMessages'
import { TAB_ROWS } from 'shared/constants/settingTypes'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get(/.*/, (req: { query: { category: string; tab: string }}, res) => {
    const { query: { category, tab } } = req
    if (Object.values(SettingTypes.CATEGORIES).find(cat => cat === category) !== null) {
      return handleSettingsDataFetch(category, tab, req, res)
    } else {
      res.status(200).send([])
      return true
    }
  })

  router.post(/.*/, async (req, res) => {
    const { body: { category, tab, inputs } } = req

    if (inputs && Object.values(inputs).length > 0) {
      if (category && tab && TAB_ROWS[category] !== undefined && TAB_ROWS[category].indexOf(tab) !== -1) {
        const success = await handleSettingsDataUpdate(category, tab, inputs, req, res)
        if (success) {
          return handleSettingsDataFetch(category, tab, req, res)
        }
      } else {
        res.status(200).send({ [NotificationTypes.ERRORS]: [ERROR.INVALID_REQUEST] })
      }
    } else {
      res.status(200).send({ [NotificationTypes.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    }
    return true
  })

  return router
}
