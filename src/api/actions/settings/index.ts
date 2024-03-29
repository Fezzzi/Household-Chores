import express, { Response } from 'express'

import { ERROR, INFO } from 'shared/constants/localeMessages'
import {
  SETTING_CATEGORIES,
  SETTING_TAB_ROWS,
  NOTIFICATION_TYPE,
  PROFILE_TABS,
  HOUSEHOLD_TABS,
  API,
  isAvailableLocale,
  isSettingCategory,
} from 'shared/constants'
import { updateUserLocale } from 'api/database'
import { NotifySettingsApiType, UserDialogsUnforcedApiType } from 'api/database/mappers'
import { catchErrors } from 'api/helpers/errorHandler'

import { GeneralEditInputs, HouseholdEditInputs, SettingsUpdateRequestInputs } from './types'
import {
  handleDialogsEdit,
  handleGeneralEdit,
  handleHouseholdEdit,
  handleNotificationsEdit,
  handleSettingsDataFetch,
} from './handlers'

export default () => {
  const router = express.Router()
  router.get(/.*/, catchErrors(async (req, res) => {
    const { query: { category, tab } } = req as { query: { category: string; tab: string }}

    if (isSettingCategory(category)) {
      await handleSettingsDataFetch(category, tab, req, res)
      return
    }

    res.status(204).send()
  }))

  router.put(`/${API.UPDATE_LOCALE}`, catchErrors(async (req: any, res) => {
    const { locale } = req.body as { locale: string }

    if (isAvailableLocale(locale) && req.session?.userId) {
      await updateUserLocale(req.session.userId, locale)
      res.status(204).send()
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
    }
  }))

  router.put(`/${API.UPDATE_PROFILE}`, catchErrors(async (req: any, res) => {
    const { category, tab, inputs } = req.body

    if (inputs && Object.values(inputs).length > 0) {
      if (category && tab && category in SETTING_TAB_ROWS) {
        const handled = await editSettings(category, tab, inputs, req, res)
        if (!handled) {
          await handleSettingsDataFetch(category, tab, req, res)
        }
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
      }
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    }
  }))

  return router
}

const editSettings = (category: string, tab: string, inputs: SettingsUpdateRequestInputs, req: any, res: Response) => {
  if (Object.keys(inputs).length === 0) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return true
  }
  const { userId, fsKey, locale } = req.session

  // todo: Add typeguards instead of casting
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      switch (tab) {
        case PROFILE_TABS.GENERAL:
          return handleGeneralEdit(userId, fsKey, inputs as GeneralEditInputs, res)
        case PROFILE_TABS.NOTIFICATIONS:
          return handleNotificationsEdit(userId, inputs as NotifySettingsApiType, res)
        case PROFILE_TABS.DIALOGS:
          return handleDialogsEdit(userId, inputs as UserDialogsUnforcedApiType, res)
      }
      break
    case SETTING_CATEGORIES.HOUSEHOLDS:
      if (tab === HOUSEHOLD_TABS._HOUSEHOLD) {
        return handleHouseholdEdit(userId, fsKey, locale, inputs as HouseholdEditInputs, res)
      }
      break
  }
  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
  return true
}
