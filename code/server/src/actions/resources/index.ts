import express from 'express'

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants'
import { resources } from 'serverSrc/resources'

export default () => {
  const router = express.Router()
  router.get('/:resource', async (req: any, res) => {
    const { params: { resource }, query } = req
    const locale = req.session?.locale ?? query.locale
    const localeCode = (locale && AVAILABLE_LOCALES.includes(locale as string) && locale as string) || DEFAULT_LOCALE
    const resourceData = resources[localeCode]?.[resource] ?? resources[DEFAULT_LOCALE]?.[resource]

    if (resourceData) {
      res.status(200).send(resourceData)
      return
    }

    res.status(404).send('Not Found')
  })

  return router
}
