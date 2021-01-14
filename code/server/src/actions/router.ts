import express, { NextFunction } from 'express'
import path from 'path'

import { API } from 'shared/constants'

import LoadRouter from './load'
import AuthRouter from './auth'
import ResourceRouter from './resources'
import SettingsRouter from './settings'
import ConnectionsRouter from './connections'
import HouseholdsRouter from './households'

// Middleware function to check for logged-in users
const sessionChecker = (req: any, res: any, next: NextFunction) => {
  if (req.session && req.session.user && req.cookies.user_sid) {
    next()
  } else {
    res.status(403).send('Access denied!')
  }
}

export default () => {
  const router = express.Router()

  router.all(/.*/, (req, res, next) => {
    if (req.xhr) {
      next()
    } else {
      res
        .status(200)
        .sendFile(path.resolve('./dist/index.html'))
    }
  })

  router.use(`/${API.LOAD_PREFIX}`, LoadRouter())
  router.use(`/${API.AUTH_PREFIX}`, AuthRouter())
  router.use(`/${API.RESOURCES_PREFIX}`, ResourceRouter())
  router.use(`/${API.SETTINGS_PREFIX}`, sessionChecker, SettingsRouter())
  router.use(`/${API.CONNECTIONS_PREFIX}`, sessionChecker, ConnectionsRouter())
  router.use(`/${API.HOUSEHOLDS_PREFIX}`, sessionChecker, HouseholdsRouter())

  router.all(/.*/, (_req, res) => {
    res.status(404).send('Not Found')
  })

  return router
}
