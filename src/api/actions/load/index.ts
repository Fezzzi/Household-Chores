import express from 'express'

import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { CONFIG } from 'api/constants'
import { getProfileData, getActivityForUser, getDialogSettings, markActivityForUser } from 'api/database'
import { catchErrors } from 'api/helpers/errorHandler'

export default () => {
  const router = express.Router()
  router.get('/:action', catchErrors(async (req: any, res) => {
    const { params: { action } } = req
    switch (action) {
      case API.LOAD_STATE: {
        const userId = req.cookies.user_sid && req.session?.userId

        if (userId) {
          res.status(200).send({
            debug: CONFIG.DEBUG,
            isUserLogged: true,
            user: await getProfileData(userId),
            activityFeed: await getActivityForUser(userId, 1),
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
      case API.LOAD_FEED: {
        const userId = req.cookies.user_sid && req.session?.userId
        const { page, pageSize } = req.query
        if (page == null || isNaN(page) || (pageSize && isNaN(pageSize))) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
          break
        }

        const data = await getActivityForUser(userId, Number(page), isNaN(pageSize) ? Number(pageSize) : undefined)
        if (data.length > 0) {
          // This endpoint is triggered when user interacts with the activity feed panel, thus we mark fetched as seen
          await markActivityForUser(data.map(({ id }) => id))
        }

        res.status(200).send(data)
        break
      }
      default:
        res.status(404).send('Not Found')
    }
    return true
  }))

  return router
}
