import { Response } from 'express'

import { INPUT_TYPE, INVITATION_MESSAGE_LENGTH, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { getApprovedConnections } from 'serverSrc/database'

import { CreateHouseholdInputs, CreateHouseholdInvitation } from './types'
import { validateField } from '../validate'

export const validateCreateData = async (
  inputs: CreateHouseholdInputs,
  invitations: CreateHouseholdInvitation[],
  userId: number,
  res: Response
): Promise<boolean> => {
  const { name, photo, userNickname, userPhoto } = inputs

  if (!name || !userNickname || !photo || !userPhoto) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (!(validateField(res, name, INPUT_TYPE.TEXT)
    && validateField(res, userNickname, INPUT_TYPE.TEXT)
    && validateField(res, photo, INPUT_TYPE.PHOTO)
    && validateField(res, userPhoto, INPUT_TYPE.PHOTO)
  )) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (invitations.length > 0) {
    const connections = await getApprovedConnections(userId)
    const connectionIds = connections.map(({ userId }) => userId)
    const validRequest = invitations.every(({ toId }) => connectionIds.indexOf(toId) !== -1)
    const validMessages = invitations.every(({ message }) => !message
      || validateField(res, message, INPUT_TYPE.TEXT_AREA, { max: INVITATION_MESSAGE_LENGTH }))

    if (!validRequest || !validMessages) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
      return false
    }
  }
  return true
}
