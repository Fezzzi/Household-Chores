import express from 'express'
import dotenv from 'dotenv'

import { handleSettingsDataFetch, handleSettingsDataUpdate } from 'serverSrc/actions/settings/handlers'
import { ERROR, INFO } from 'shared/constants/localeMessages'
import { SETTING_CATEGORIES, SETTING_TAB_ROWS, NOTIFICATION_TYPE } from 'shared/constants'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get(/.*/, (req: { query: { category: string; tab: string }}, res) => {
    const { query: { category, tab } } = req
    if (Object.values(SETTING_CATEGORIES).find(cat => cat === category) !== null) {
      return handleSettingsDataFetch(category, tab, req, res)
    } else {
      res.status(200).send([])
      return true
    }
  })

  router.post(/.*/, async (req, res) => {
    const { body: { category, tab, inputs } } = req

    if (inputs && Object.values(inputs).length > 0) {
      if (category && tab && SETTING_TAB_ROWS[category] !== undefined) {
        const handled = await handleSettingsDataUpdate(category, tab, inputs, req, res)
        if (!handled) {
          return handleSettingsDataFetch(category, tab, req, res)
        }
      } else {
        res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
      }
    } else {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    }
    return true
  })

  return router
}
