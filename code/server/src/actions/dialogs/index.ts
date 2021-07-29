import express from 'express'

import { disableDialog } from 'serverSrc/database/models'
import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { deApifyKey } from 'serverSrc/helpers/api'
import { tDialogsCols } from 'serverSrc/database/models/tables'

export default () => {
  const router = express.Router()
  router.put('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.userId

    if (action === API.DIALOGS_DISABLE) {
      const key = deApifyKey(body.key)
      const valid = Object.values(tDialogsCols).filter(name => name !== tDialogsCols.id_user).includes(key)
      if (!valid) {
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
