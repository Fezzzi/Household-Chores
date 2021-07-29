import express from 'express'
import dotenv from 'dotenv'

import { API } from 'shared/constants'
import { findProfileData, getActivityForUser, getDialogSettings } from 'serverSrc/database/models'
import { CONFIG } from 'serverSrc/constants'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req
    switch (action) {
      case API.LOAD_STATE: {
        const userId = req.session && req.cookies.user_sid && req.session.userId
        if (userId) {
          res.status(200).send({
            debug: CONFIG.DEBUG,
            isUserLogged: true,
            user: await findProfileData(userId),
            activityFeed: await getActivityForUser(userId),
            dialogSettings: await getDialogSettings(userId),
          })
        } else {
          res.status(200).send({
            debug: CONFIG.DEBUG,
            isUserLogged: false,
          })
        }
        break
      }
      default:
        res.status(404).send('Not Found')
    }
    return true
  })

  return router
}
