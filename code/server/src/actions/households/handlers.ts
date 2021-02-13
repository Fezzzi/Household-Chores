import { HOUSEHOLD_DIR, isLocalImage, uploadFiles } from 'serverSrc/helpers/files'

import { validateField } from 'serverSrc/helpers/settings'
import {
  addHouseholdInvitations, approveInvitation, createHousehold, findApprovedConnections,
} from 'serverSrc/database/models'
import { NOTIFICATION_TYPE, INPUT_TYPE, API, SETTING_CATEGORIES, INVITATION_MESSAGE_LENGTH } from 'shared/constants'
import { HOUSEHOLD_KEYS, INVITATION_KEYS } from 'shared/constants/mappingKeys'
import { ERROR } from 'shared/constants/localeMessages'

const validateCreateData = async (
  inputs: Record<string, string | number>,
  invitations: Array<Record<string, string | number>>,
  userId: number,
  res: any
): Promise<boolean> => {
  if (!inputs[HOUSEHOLD_KEYS.NAME] || !inputs[HOUSEHOLD_KEYS.USER_NAME]
    || !inputs[HOUSEHOLD_KEYS.PHOTO] || !inputs[HOUSEHOLD_KEYS.USER_PHOTO]
  ) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (!(validateField(res, inputs[HOUSEHOLD_KEYS.NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[HOUSEHOLD_KEYS.PHOTO], INPUT_TYPE.PHOTO)
    && validateField(res, inputs[HOUSEHOLD_KEYS.USER_PHOTO], INPUT_TYPE.PHOTO)
  )) {
    return false
  }

  if (invitations.length > 0) {
    const connections = await findApprovedConnections(userId)
    const connectionIds = connections.map(({ id }) => id)
    const validRequest = invitations.every(({ id }) => connectionIds.indexOf(id) !== -1)
    if (!validRequest) {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return false
    }
    const validMessages = invitations.every(({ [INVITATION_KEYS.MESSAGE]: message }) => !message
      || validateField(res, message, INPUT_TYPE.TEXT_AREA, { max: INVITATION_MESSAGE_LENGTH }))
    if (!validMessages) {
      return false
    }
  }
  return true
}

export const handleCreateHousehold = async (
  inputs: Record<string, string | number>,
  invitations: Array<Record<string, string | number>>,
  userId: number,
  req: any,
  res: any,
): Promise<boolean> => {
  const valid = await validateCreateData(inputs, invitations, userId, res)
  if (!valid) {
    return true
  }
  const [photo, userPhoto] = uploadFiles([
    inputs[HOUSEHOLD_KEYS.PHOTO] as any,
    inputs[HOUSEHOLD_KEYS.USER_PHOTO] as any,
  ], HOUSEHOLD_DIR, req.session!.fsKey)

  if (photo === null || userPhoto === null) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }

  const householdId = await createHousehold({
    ...inputs,
    [HOUSEHOLD_KEYS.PHOTO]: photo,
    [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
  }, userId)

  if (householdId === null) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  }
  const success = invitations.length === 0 || await addHouseholdInvitations(householdId, invitations, userId)
  res.status(200).send(success
    ? { url: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}` }
    : { [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  return true
}

export const handleApproveHouseholdInvitation = async (
  fromId: number,
  householdId: number,
  name: string,
  photo: any,
  userId: number,
  req: any,
  res: any,
): Promise<boolean> => {
  if (!fromId || !householdId || !name || !photo) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (!(validateField(res, name, INPUT_TYPE.TEXT)
    && (isLocalImage(photo, req.session!.fsKey)
    || validateField(res, photo, INPUT_TYPE.PHOTO)))
  ) {
    return false
  }

  const userPhoto = isLocalImage(photo, req.session!.fsKey)
    ? photo
    : uploadFiles([photo as any], HOUSEHOLD_DIR, req.session!.fsKey)[0]
  if (userPhoto === null) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }

  const success = await approveInvitation(userId, fromId, householdId, name, userPhoto)
  if (success) {
    res.status(200).send({
      url: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`,
    })
  } else {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }
  return true
}
