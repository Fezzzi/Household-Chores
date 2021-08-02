import express from 'express'

import { disableDialog, isDialogColumnKey } from 'serverSrc/database'
import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { deApifyKey } from 'serverSrc/helpers/api'

export default () => {
  const router = express.Router()
  router.put('/:action', async (req: any, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.userId

    if (action === API.DIALOGS_DISABLE) {
      const key = deApifyKey(body.key)
      if (!isDialogColumnKey(key)) {
        res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
        return
      }

      const success = await disableDialog(key, userId)
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
