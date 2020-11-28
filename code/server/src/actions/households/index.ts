import express from 'express'

import {
  approveInvitation,
  deleteHousehold,
  deleteInvitation,
  findUserHouseholds,
  findUserInvitations,
  getUserRole,
  leaveHousehold,
} from 'serverSrc/database/models/households'
import { API, NOTIFICATION_TYPE, HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

import { handleCreateHousehold } from './handlers'

export default () => {
  const router = express.Router()
  router.post('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.user
    switch (action) {
      case API.HOUSEHOLD_CREATE: {
        return handleCreateHousehold(body.inputs, body.invitations, userId, req, res)
      }
      case API.HOUSEHOLD_DELETE: {
        const role = await getUserRole(userId, body)
        if (role !== HOUSEHOLD_ROLE_TYPE.ADMIN) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
        } else {
          const success = await deleteHousehold(body)
          res.status(200).send(success ?? { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return true
      }
      case API.HOUSEHOLD_LEAVE: {
        const success = await leaveHousehold(userId, body)
        res.status(200).send(success ?? { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        return true
      }
      case API.INVITATION_APPROVE: {
        const success = await approveInvitation(userId, body)
        if (success) {
          res.status(200).send({
            invitations: await findUserInvitations(userId),
            households: await findUserHouseholds(userId),
          })
        } else {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return true
      }
      case API.INVITATION_IGNORE: {
        const success = await deleteInvitation(userId, body)
        if (success) {
          res.status(200).send(body)
        } else {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return true
      }
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  return router
}
