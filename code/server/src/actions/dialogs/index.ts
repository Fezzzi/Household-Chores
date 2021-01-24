import express from 'express'

import { disableDialog } from 'serverSrc/database/models'
import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

export default () => {
  const router = express.Router()
  router.post('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.user
    switch (action) {
      case API.DIALOGS_DISABLE: {
        const success = await disableDialog(userId, body.key)
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
