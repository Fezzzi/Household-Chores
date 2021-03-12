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
      handleSettingsDataFetch(category, tab, req, res)
      return
    }

    res.status(204).send()
  })

  router.put(/.*/, async (req, res) => {
    const { body: { category, tab, inputs } } = req

    if (inputs && Object.values(inputs).length > 0) {
      if (category && tab && SETTING_TAB_ROWS[category] !== undefined) {
        // todo: Move switch from handlers here and break underlaying handler to multiple functions
        const handled = await handleSettingsDataUpdate(category, tab, inputs, req, res)
        if (!handled) {
          handleSettingsDataFetch(category, tab, req, res)
        }
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
      }
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    }
  })

  return router
}
