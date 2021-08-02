import express from 'express'

import { logActivity } from 'serverSrc/helpers/activity'
import {
  approveConnection,
  blockConnection,
  createConnectionRequest,
  findBlockedConnections,
  findConnections,
  queryUsers,
  removeConnection,
} from 'serverSrc/database'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { API, CONNECTION_STATE_TYPE, CONNECTION_TABS, NOTIFICATION_TYPE, SETTING_CATEGORIES } from 'shared/constants'
import { ACTIVITY, ERROR, SUCCESS } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'

const performConnectionAction = async (
  req: any,
  res: any,
  userId: number,
  action: (currentUser: number, targetUser: number) => Promise<boolean>
) => {
  const success = await action(req.session.userId, userId)
  if (success) {
    const data = await findConnections(req.session.userId)
    if (data) {
      res.status(200).send(data)
      return true
    }
  }
  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  return true
}

const handleConnectionRequest = async (
  req: any,
  res: any,
  { userId, message }: { userId: number; message: string | null },
) => {
  const currentUser = req.session.userId
  const isRequestValid = (await findBlockedConnections(userId)).every(blockedUser => blockedUser !== currentUser)
  if (isRequestValid) {
    const success = await createConnectionRequest(currentUser, userId, message ?? null)
    if (success) {
      logActivity(
        NOTIFICATIONS.CONNECTION_REQUEST,
        [Number(userId)],
        `${ACTIVITY.CONNECTION_REQUEST}$[${req.session!.userNickname}]$`,
        `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.PENDING}`
      )
      res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.CONNECTION_REQUEST_SENT] })
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] })
    }
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
  }
  return true
}

export default () => {
  const router = express.Router()
  router.post('/:action', (req, res) => {
    const { params: { action }, body } = req

    if (action === API.CONNECTION_REQUEST) {
      return handleConnectionRequest(req, res, body)
    }

    res.status(404).send('Not Found')
    return false
  })

  router.put('/:action', (req: any, res) => {
    const { params: { action }, body: { userId } } = req

    switch (action) {
      case API.CONNECTION_APPROVE:
        if (performConnectionAction(req, res, Number(userId), approveConnection)) {
          logActivity(
            NOTIFICATIONS.CONNECTION_APPROVAL,
            [Number(userId)],
            `${ACTIVITY.CONNECTION_APPROVAL}$[${req.session!.userNickname}]$`,
            `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.CONNECTIONS}?tab=${CONNECTION_TABS.MY_CONNECTIONS}`
          )
          return true
        }
        return false
      case API.CONNECTION_BLOCK:
        return performConnectionAction(req, res, Number(userId), blockConnection)
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  router.delete('/:action', (req, res) => {
    const { params: { action }, query: { userId } } = req
    switch (action) {
      case API.CONNECTION_IGNORE:
      case API.CONNECTION_REMOVE:
      case API.CONNECTION_UNBLOCK:
        return performConnectionAction(req, res, Number(userId), removeConnection)
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  router.get('/:action', async (req: any, res) => {
    const { params: { action }, query: { query } } = req

    if (action === API.CONNECTION_FIND) {
      const foundUsers = await queryUsers(query as string, req.session!.userId)
      res.status(200).send({ [CONNECTION_STATE_TYPE.FOUND]: foundUsers })
      return
    }

    res.status(404).send('Not Found')
  })

  return router
}
