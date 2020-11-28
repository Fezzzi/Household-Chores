import express from 'express'

import { RESOURCE_NOT_FOUND } from 'shared/constants/api'
import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants/locale'

const sendResourceData = async (res: any, localeCode: string, resource: string): Promise<boolean> => {
  try {
    const file = await import(`serverSrc/resources/${localeCode}/${resource}.js`)
    res.status(200).send(file.default)
    return true
  } catch (e) {
    return false
  }
}

export default () => {
  const router = express.Router()
  router.get('/:resource', async (req, res) => {
    const { params: { resource }, query: { locale } } = req
    const localeCode
      = (locale && AVAILABLE_LOCALES.includes(locale as string) && locale as string)
      || DEFAULT_LOCALE

    if (await sendResourceData(res, localeCode, resource) || await sendResourceData(res, localeCode, RESOURCE_NOT_FOUND)) {
      return
    }
    res.status(404).send('Not Found')
  })

  return router
}
