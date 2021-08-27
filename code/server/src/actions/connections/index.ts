import express from 'express'

import { API, CONNECTION_STATE_TYPE, CONNECTION_TABS, SETTING_CATEGORIES } from 'shared/constants'
import { ACTIVITY } from 'shared/constants/localeMessages'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { logActivity } from 'serverSrc/helpers/activity'
import {
  approveConnection,
  blockConnection,
  getUserInfo,
  queryUsers,
  removeConnection,
} from 'serverSrc/database'
import { catchErrors } from 'serverSrc/helpers/errorHandler'

import { handleConnectionAction, handleConnectionRequest } from './handlers'

export default () => {
  const router = express.Router()
  router.post('/:action', catchErrors(async (req, res) => {
    const { params: { action }, body: { targetId, message } } = req

    if (action === API.CONNECTION_REQUEST) {
      await handleConnectionRequest(req, res, targetId, message)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.put('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, body: { targetId } } = req

    switch (action) {
      case API.CONNECTION_APPROVE: {
        const success = await handleConnectionAction(req, res, Number(targetId), approveConnection)

        if (success) {
          const { nickname, photo } = await getUserInfo(req.session!.userId)

          logActivity(
            NOTIFICATIONS.CONNECTION_APPROVAL,
            [Number(targetId)],
            ACTIVITY.CONNECTION_APPROVAL,
            [nickname],
            [photo!],
            `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.MY_CONNECTIONS}`
          )
        }
        return
      }
      case API.CONNECTION_BLOCK:
        await handleConnectionAction(req, res, Number(targetId), blockConnection)
        return
      default:
        res.status(404).send('Not Found')
    }
  }))

  router.delete('/:action', catchErrors(async (req, res) => {
    const { params: { action }, query: { targetId } } = req
    switch (action) {
      case API.CONNECTION_IGNORE:
      case API.CONNECTION_REMOVE:
      case API.CONNECTION_UNBLOCK:
        await handleConnectionAction(req, res, Number(targetId), removeConnection)
        return
      default:
        res.status(404).send('Not Found')
    }
  }))

  router.get('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, query: { query } } = req

    if (action === API.CONNECTION_FIND) {
      const foundUsers = await queryUsers(query as string, req.session!.userId)
      res.status(200).send({ [CONNECTION_STATE_TYPE.FOUND]: foundUsers })
      return
    }

    res.status(404).send('Not Found')
  }))

  return router
}
