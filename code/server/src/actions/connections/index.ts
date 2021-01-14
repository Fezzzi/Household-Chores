import express from 'express'

import {
  queryUsers, approveConnection, createConnection, blockConnection,
  removeConnection, findBlockedConnections, findConnections,
} from 'serverSrc/database/models'
import { API, CONNECTION_STATE_TYPE, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

const findUsers = async (req: any, res: any, { query }: { query: string }) => {
  const foundUsers = await queryUsers(query, req.session.user)
  res.status(200).send({ [CONNECTION_STATE_TYPE.FOUND]: foundUsers })
  return true
}

const performConnectionAction = async (
  req: any,
  res: any,
  { targetId }: { targetId: number },
  action: (currentUser: number, targetUser: number) => Promise<boolean>
) => {
  const success = await action(req.session.user, targetId)
  if (success) {
    const data = await findConnections(req.session.user)
    if (data) {
      res.status(200).send({ ...data })
      return true
    }
  }
  res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  return true
}

const handleConnectionRequest = async (
  req: any,
  res: any,
  { targetId, message }: { targetId: number; message: string | null },
) => {
  const currentUser = req.session.user
  const isRequestValid = !(await findBlockedConnections(targetId)).find(blockedUser => blockedUser === currentUser)
  if (isRequestValid) {
    const success = await createConnection(currentUser, targetId, message ?? null)
    if (success) {
      res.status(200).send({ targetId })
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
    switch (action) {
      case API.CONNECTION_FIND:
        return findUsers(req, res, body)
      case API.CONNECTION_REQUEST:
        return handleConnectionRequest(req, res, body)
      case API.CONNECTION_APPROVE:
        return performConnectionAction(req, res, body, approveConnection)
      case API.CONNECTION_BLOCK:
        return performConnectionAction(req, res, body, blockConnection)
      case API.CONNECTION_IGNORE:
      case API.CONNECTION_REMOVE:
      case API.CONNECTION_UNBLOCK:
        return performConnectionAction(req, res, body, removeConnection)
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  return router
}
