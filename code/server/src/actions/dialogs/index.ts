import express from 'express'

import { disableDialog } from 'serverSrc/database/models'
import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { deMapKey } from 'serverSrc/helpers/api'
import { tDialogsCols } from 'serverSrc/database/models/tables'

export default () => {
  const router = express.Router()
  router.post('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.user
    switch (action) {
      case API.DIALOGS_DISABLE: {
        const key = deMapKey(body.key)
        console.log(key)
        const valid = Object.values(tDialogsCols).filter(name => name !== 'id_user').includes(key)
        if (!valid) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
        }

        console.log('UPDATING KEY', key)
        const success = await disableDialog(userId, key)
        res.status(200).send(success ? {} : { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        return true
      }
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  return router
}
