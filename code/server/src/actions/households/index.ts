import express from 'express'

import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { deleteInvitation, getUserHouseholdsData } from 'serverSrc/database'
import { catchErrors } from 'serverSrc/helpers/errorHandler'

import {
  handleApproveHouseholdInvitation,
  handleCreateHousehold,
  handleDeleteHousehold,
  handleLeaveHousehold,
} from './handlers'
import {
  ApproveInvitationRequest,
  CreateHouseholdRequest,
  DeleteHouseholdRequest,
  IgnoreInvitationRequest,
} from './types'

export default () => {
  const router = express.Router()
  router.get('/:action', catchErrors(async (req: any, res) => {
    const { params: { action } } = req
    const userId = req.session!.userId

    switch (action) {
      case API.HOUSEHOLDS_LOAD: {
        const households = await getUserHouseholdsData(userId, true)
        if (!households) {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_ERROR] })
          return
        }

        res.status(200).send(households)
        return
      }
      default:
        res.status(404).send('Not Found')
    }
  }))

  router.post('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, body } = req
    const { userId, fsKey } = req.session!

    if (action === API.HOUSEHOLD_CREATE) {
      const { inputs, invitations }: CreateHouseholdRequest = body as any
      await handleCreateHousehold(inputs, invitations, userId, fsKey, res)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.put('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, body } = req
    const { userId, userNickname, fsKey } = req.session!

    if (action === API.INVITATION_APPROVE) {
      const invitationBody: ApproveInvitationRequest = body as any
      await handleApproveHouseholdInvitation(invitationBody, userId, userNickname, fsKey, res)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.delete('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, query } = req
    const { userId, userNickname } = req.session!

    switch (action) {
      case API.HOUSEHOLD_DELETE: {
        const { householdId }: DeleteHouseholdRequest = query as any
        await handleDeleteHousehold(userId, userNickname, householdId, res)
        return
      }
      case API.HOUSEHOLD_LEAVE: {
        const { householdId }: DeleteHouseholdRequest = query as any
        await handleLeaveHousehold(userId, userNickname, householdId, res)
        return
      }
      case API.INVITATION_IGNORE: {
        const { fromId, householdId }: IgnoreInvitationRequest = query as any
        const success = await deleteInvitation(userId, fromId, householdId)

        if (success) {
          res.status(204).send()
        } else {
          res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
        }
        return
      }
      default:
        res.status(404).send('Not Found')
    }
  }))

  return router
}
