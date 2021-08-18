import express from 'express'

import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { updateDialogSettings } from 'serverSrc/database'
import { mapFromUserDialogsUnforcedApiType } from 'serverSrc/database/mappers'

export default () => {
  const router = express.Router()
  router.put('/:action', async (req: any, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.userId

    if (action === API.DIALOGS_DISABLE) {
      const settings = mapFromUserDialogsUnforcedApiType({ [body.key]: false })
      if (Object.keys(settings).length === 0) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
        return
      }

      const success = await updateDialogSettings(settings, userId)
      if (success) {
        res.status(204).send()
      } else {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      }

      return
    }

    res.status(404).send('Not Found')
  })

  return router
}
