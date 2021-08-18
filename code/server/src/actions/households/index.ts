import express from 'express'

import { deleteInvitation, getUserHouseholdsData } from 'serverSrc/database'
import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'

import {
  handleApproveHouseholdInvitation, handleCreateHousehold, handleDeleteHousehold, handleLeaveHousehold,
} from './handlers'
import {
  ApproveInvitationRequest, CreateHouseholdRequest, DeleteHouseholdRequest, IgnoreInvitationRequest,
} from './types'

export default () => {
  const router = express.Router()
  router.get('/:action', async (req: any, res) => {
    const { params: { action } } = req
    const userId = req.session!.userId

    switch (action) {
      case API.HOUSEHOLDS_LOAD: {
        const households = await getUserHouseholdsData(userId, true)
        if (!households) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR] })
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

  router.post('/:action', async (req: any, res) => {
    const { params: { action }, body } = req
    const { userId, fsKey } = req.session!

    if (action === API.HOUSEHOLD_CREATE) {
      const { inputs, invitations }: CreateHouseholdRequest = body as any
      return handleCreateHousehold(inputs, invitations, userId, fsKey, res)
    }

    res.status(404).send('Not Found')
    return false
  })

  router.put('/:action', async (req: any, res) => {
    const { params: { action }, body } = req
    const { userId, userNickname, fsKey } = req.session!

    if (action === API.INVITATION_APPROVE) {
      const invitationBody: ApproveInvitationRequest = body as any
      return handleApproveHouseholdInvitation(invitationBody, userId, userNickname, fsKey, res)
    }

    res.status(404).send('Not Found')
    return false
  })

  router.delete('/:action', async (req: any, res) => {
    const { params: { action }, query } = req
    const { userId, userNickname } = req.session!

    switch (action) {
      case API.HOUSEHOLD_DELETE: {
        const { householdId }: DeleteHouseholdRequest = query as any
        return handleDeleteHousehold(userId, userNickname, householdId, res)
      }
      case API.HOUSEHOLD_LEAVE: {
        const { householdId }: DeleteHouseholdRequest = query as any
        return handleLeaveHousehold(userId, userNickname, householdId, res)
      }
      case API.INVITATION_IGNORE: {
        const { fromId, householdId }: IgnoreInvitationRequest = query as any
        const success = await deleteInvitation(userId, fromId, householdId)
        if (success) {
          res.status(204).send()
        } else {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
          return false
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
