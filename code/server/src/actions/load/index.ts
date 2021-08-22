import express from 'express'

import { API } from 'shared/constants'
import { getProfileData, getActivityForUser, getDialogSettings } from 'serverSrc/database'
import { CONFIG } from 'serverSrc/constants'
import { catchErrors } from 'serverSrc/helpers/errorHandler'

export default () => {
  const router = express.Router()
  router.get('/:action', catchErrors(async (req: any, res) => {
    const { params: { action } } = req
    switch (action) {
      case API.LOAD_STATE: {
        const userId = req.session && req.cookies.user_sid && req.session.userId
        if (userId) {
          res.status(200).send({
            debug: CONFIG.DEBUG,
            isUserLogged: true,
            user: await getProfileData(userId),
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
  }))

  return router
}
