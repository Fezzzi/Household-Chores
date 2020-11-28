import express from 'express'
import dotenv from 'dotenv'

import { API } from 'shared/constants'
import { findProfileData } from 'serverSrc/database/models/users'
import { getActivityForUser } from 'serverSrc/database/models/activity'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req
    switch (action) {
      case API.LOAD_STATE: {
        const userId = req.session && req.cookies.user_sid && req.session.user
        res.status(200).send({
          debug: process.env.DEBUG,
          loggedUser: !!(userId),
          user: userId && await findProfileData(userId),
          activityFeed: userId && await getActivityForUser(userId),
        })
        return
      }
      default:
        res.status(404).send('Not Found')
    }
  })

  return router
}
