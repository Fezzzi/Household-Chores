import express from 'express'

import { API, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { deleteInvitation, getUserHouseholdsData } from 'api/database'
import { catchErrors } from 'api/helpers/errorHandler'

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
    const { userId, fsKey, locale } = req.session!

    if (action === API.HOUSEHOLD_CREATE) {
      const { inputs, invitations }: CreateHouseholdRequest = body
      await handleCreateHousehold(inputs, invitations, userId, fsKey, locale, res)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.put('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, body } = req
    const { userId, userNickname, fsKey, locale } = req.session!

    if (action === API.INVITATION_APPROVE) {
      const invitationBody: ApproveInvitationRequest = body
      await handleApproveHouseholdInvitation(invitationBody, userId, userNickname, fsKey, locale, res)
      return
    }

    res.status(404).send('Not Found')
  }))

  router.delete('/:action', catchErrors(async (req: any, res) => {
    const { params: { action }, query } = req
    const { userId, locale } = req.session!

    switch (action) {
      case API.HOUSEHOLD_DELETE: {
        const { householdId }: DeleteHouseholdRequest = query
        await handleDeleteHousehold(userId, householdId, locale, res)
        return
      }
      case API.HOUSEHOLD_LEAVE: {
        const { householdId }: DeleteHouseholdRequest = query
        await handleLeaveHousehold(userId, householdId, locale, res)
        return
      }
      case API.INVITATION_IGNORE: {
        const { fromId, householdId }: IgnoreInvitationRequest = query
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
