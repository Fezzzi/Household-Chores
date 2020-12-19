import express from 'express'
import dotenv from 'dotenv'

import { API } from 'shared/constants'
import { findProfileData, getActivityForUser, markActivitySeen } from 'serverSrc/database/models'

dotenv.config()

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req
    const userId = req.session && req.cookies.user_sid && req.session.user
    switch (action) {
      case API.LOAD_STATE:
        if (!userId) {
          res.status(200).send({ debug: process.env.DEBUG, loggedUser: false })
          return
        }
        res.status(200).send({
          debug: process.env.DEBUG,
          loggedUser: true,
          user: await findProfileData(userId),
          activityFeed: await getActivityForUser(userId),
        })
        return
      default:
        res.status(404).send('Not Found')
    }
  })
  router.put('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session && req.cookies.user_sid && req.session.user
    switch (action) {
      case API.MARK_ACTIVITY:
        await markActivitySeen(userId, body)
        res.status(200)
        return
      default:
        res.status(404).send('Not Found')
    }
  })

  return router
}
