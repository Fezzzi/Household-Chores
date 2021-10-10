import express from 'express'

import { DEFAULT_LOCALE, isAvailableLocale } from 'shared/constants'
import { resources } from 'api/resources'
import { catchErrors } from 'api/helpers/errorHandler'

export default () => {
  const router = express.Router()
  router.get('/:resource', catchErrors(async (req: any, res) => {
    const { params: { resource }, query } = req
    const locale = req.session?.locale ?? query.locale
    const localeCode = isAvailableLocale(locale)
      ? locale
      : DEFAULT_LOCALE
    const resourceData = resources[localeCode]?.[resource] ?? resources[DEFAULT_LOCALE]?.[resource]

    if (resourceData) {
      res.status(200).send(resourceData)
      return
    }

    res.status(404).send('Not Found')
  }))

  return router
}
