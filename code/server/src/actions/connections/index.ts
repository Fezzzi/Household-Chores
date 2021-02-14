import express from 'express'

import {
  queryUsers, approveConnection, createConnectionRequest, blockConnection,
  removeConnection, findBlockedConnections, findConnections,
} from 'serverSrc/database/models'
import { API, CONNECTION_STATE_TYPE, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR, SUCCESS } from 'shared/constants/localeMessages'

const findUsers = async (req: any, res: any, query: string) => {
  const foundUsers = await queryUsers(query, req.session.user)
  res.status(200).send({ [CONNECTION_STATE_TYPE.FOUND]: foundUsers })
  return true
}

const performConnectionAction = async (
  req: any,
  res: any,
  userId: number,
  action: (currentUser: number, targetUser: number) => Promise<boolean>
) => {
  const success = await action(req.session.user, userId)
  if (success) {
    const data = await findConnections(req.session.user)
    if (data) {
      res.status(200).send(data)
      return true
    }
  }
  res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  return true
}

const handleConnectionRequest = async (
  req: any,
  res: any,
  { userId, message }: { userId: number; message: string | null },
) => {
  const currentUser = req.session.user
  const isRequestValid = !(await findBlockedConnections(userId)).find(blockedUser => blockedUser === currentUser)
  if (isRequestValid) {
    const success = await createConnectionRequest(currentUser, userId, message ?? null)
    if (success) {
      res.status(200).send({ [NOTIFICATION_TYPE.SUCCESSES]: [SUCCESS.CONNECTION_REQUEST_SENT] })
    } else {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] })
    }
  } else {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
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

  router.put('/:action', (req, res) => {
    const { params: { action }, body: { userId } } = req

    switch (action) {
      case API.CONNECTION_APPROVE:
        return performConnectionAction(req, res, Number(userId), approveConnection)
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

  router.get('/:action', (req, res) => {
    const { params: { action }, query: { query } } = req

    if (action === API.CONNECTION_FIND) {
      return findUsers(req, res, query as string)
    }

    res.status(404).send('Not Found')
    return false
  })

  return router
}
