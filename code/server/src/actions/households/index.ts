import express from 'express'

import {
  deleteHousehold, deleteInvitation, findHouseholdAdmins, findUserHouseholds,
  findUserInvitations, getUserRole, leaveHousehold, getUserHouseholdsData,
} from 'serverSrc/database/models'
import { API, NOTIFICATION_TYPE, HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { INVITATION_KEYS, HOUSEHOLD_KEYS, HOUSEHOLD_GROUP_KEYS } from 'shared/constants/mappingKeys'

import { handleApproveHouseholdInvitation, handleCreateHousehold } from './handlers'

export default () => {
  const router = express.Router()
  router.get('/:action', async (req, res) => {
    const { params: { action } } = req
    const userId = req.session!.user
    switch (action) {
      case API.HOUSEHOLDS_LOAD: {
        // eslint-disable-next-line no-undef
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
    switch (action) {
      case API.HOUSEHOLD_CREATE: {
        const {
          inputs,
          [HOUSEHOLD_GROUP_KEYS.INVITATIONS]: invitations,
        } = body
        return handleCreateHousehold(inputs, invitations, userId, req, res)
      }
      case API.HOUSEHOLD_DELETE: {
        const { householdId } = body
        const role = await getUserRole(userId, householdId)
        if (role !== HOUSEHOLD_ROLE_TYPE.ADMIN) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
        } else {
          const success = await deleteHousehold(householdId)
          res.status(200).send(success ?? { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return true
      }
      case API.HOUSEHOLD_LEAVE: {
        const { householdId } = body
        const admins = await findHouseholdAdmins(householdId)
        if (!admins || (admins.length === 1 && admins.indexOf(userId) !== -1)) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
          return true
        }
        const success = await leaveHousehold(userId, householdId)
        res.status(200).send(success ?? { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        return true
      }
      case API.INVITATION_APPROVE: {
        const {
          [INVITATION_KEYS.FROM_ID]: fromId,
          [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
          [HOUSEHOLD_KEYS.USER_NAME]: name,
          [HOUSEHOLD_KEYS.USER_PHOTO]: photo,
        } = body
        return handleApproveHouseholdInvitation(fromId, householdId, name, photo, userId, req, res)
      }
      case API.INVITATION_IGNORE: {
        const { [INVITATION_KEYS.FROM_ID]: fromId, [INVITATION_KEYS.HOUSEHOLD_ID]: householdId } = body
        const success = await deleteInvitation(userId, fromId, householdId)
        if (success) {
          res.status(200).send({
            invitations: await findUserInvitations(userId),
            households: await findUserHouseholds(userId),
          })
          return true
        }
        res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        return true
      }
      default:
        res.status(404).send('Not Found')
        return false
    }
  })

  return router
}
