import express from 'express'

import {
  deleteHousehold, deleteInvitation, findHouseholdAdmins,
  getUserRole, leaveHousehold, getUserHouseholdsData,
} from 'serverSrc/database/models'
import { API, NOTIFICATION_TYPE, HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

import { handleApproveHouseholdInvitation, handleCreateHousehold } from './handlers'

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req
    const userId = req.session!.user
    switch (action) {
      case API.HOUSEHOLDS_LOAD: {
        const households = await getUserHouseholdsData(userId)
        if (!households) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR] })
          return true
        }

        res.status(200).send(households)
        return true
      }
      default:
        res.status(404).send('Not Found')
    }
    return true
  })

  router.post('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.user

    if (action === API.HOUSEHOLD_CREATE) {
      handleCreateHousehold(body.inputs, body.invitations, userId, req, res)
      return
    }

    res.status(404).send('Not Found')
  })

  router.put('/:action', async (req, res) => {
    const { params: { action }, body } = req
    const userId = req.session!.user

    if (action === API.INVITATION_APPROVE) {
      const {
        fromId,
        householdId,
        userNickname,
        userPhoto,
      } = body

      handleApproveHouseholdInvitation(fromId, householdId, userNickname, userPhoto, userId, req, res)
      return
    }

    res.status(404).send('Not Found')
  })

  router.delete('/:action', async (req, res) => {
    const { params: { action }, query: { fromId, householdId } } = req
    const userId = req.session!.user
    switch (action) {
      case API.HOUSEHOLD_DELETE: {
        const role = await getUserRole(userId, Number(householdId))
        if (role !== HOUSEHOLD_ROLE_TYPE.ADMIN) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
        } else {
          const success = await deleteHousehold(Number(householdId))
          if (success) {
            res.status(204).send()
          } else {
            res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
          }
        }
        return
      }
      case API.HOUSEHOLD_LEAVE: {
        const admins = await findHouseholdAdmins(Number(householdId))
        if (!admins || (admins.length === 1 && admins.indexOf(userId) !== -1)) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
          return
        }
        const success = await leaveHousehold(userId, Number(householdId))
        if (success) {
          res.status(204).send()
        } else {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return
      }
      case API.INVITATION_IGNORE: {
        const success = await deleteInvitation(userId, Number(fromId), Number(householdId))
        if (success) {
          res.status(204).send()
        } else {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return
      }
      default:
        res.status(404).send('Not Found')
    }
  })

  return router
}
