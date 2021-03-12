import { HOUSEHOLD_DIR, isLocalImage, uploadFiles } from 'serverSrc/helpers/files'
import { validateField } from 'serverSrc/helpers/settings'
import {
  addActivityForUsers, addHouseholdInvitations, approveInvitation, createHousehold,
  deleteHousehold, getHouseholdMembers, getHouseholdName, leaveHousehold,
} from 'serverSrc/database/models'
import { NOTIFICATION_TYPE, INPUT_TYPE, API, SETTING_CATEGORIES, HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'

import { ApproveInvitationRequest, CreateHouseholdInputs, CreateHouseholdInvitation } from './types'
import { validateCreateData } from './validate'

export const handleCreateHousehold = async (
  inputs: CreateHouseholdInputs,
  invitations: CreateHouseholdInvitation[],
  userId: number,
  fsKey: string,
  res: any,
): Promise<boolean> => {
  const valid = await validateCreateData(inputs, invitations, userId, res)
  if (!valid) {
    return true
  }

  const [photo, userPhoto] = uploadFiles([
    inputs.photo,
    inputs.userPhoto,
  ], HOUSEHOLD_DIR, fsKey)

  if (photo === null || userPhoto === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }

  const householdId = await createHousehold({
    ...inputs,
    photo,
    userPhoto,
  }, userId)

  if (householdId === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  }
  const success = invitations.length === 0 || await addHouseholdInvitations(householdId, invitations, userId)
  if (success) {
    addActivityForUsers(
      invitations.map(user => user.toId),
      `${ACTIVITY.HOUSEHOLD_INVITATION}$[${inputs.name}, ${inputs.userNickname}]$`,
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
    )
    res.status(200).send({
      url: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`,
    })
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }

  return true
}

export const handleDeleteHousehold = async (
  userId: number,
  userNickname: string,
  householdId: number,
  res: any,
): Promise<boolean> => {
  const members = await getHouseholdMembers(householdId)
  const isAdmin = members?.find(({ userId: memberId }) => userId === memberId)?.role === HOUSEHOLD_ROLE_TYPE.ADMIN

  if (!isAdmin) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
    return false
  } else {
    const householdName = await getHouseholdName(householdId)
    const success = await deleteHousehold(householdId)

    if (success) {
      const notifiedMembers = members!
        .map(({ userId }) => userId)
        .filter(memberId => memberId !== userId)

      addActivityForUsers(
        notifiedMembers,
        `${ACTIVITY.HOUSEHOLD_DELETE}$[${userNickname}, ${householdName}]$`
      )
      res.status(204).send()
    } else {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
      return false
    }
  }
  return true
}

export const handleApproveHouseholdInvitation = async (
  invitationBody: ApproveInvitationRequest,
  userId: number,
  userNickname: string,
  fsKey: string,
  res: any,
): Promise<boolean> => {
  const { fromId, householdId, userNickname: nickname, userPhoto: photo } = invitationBody

  if (!fromId || !householdId || !nickname || !photo) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (!(validateField(res, nickname, INPUT_TYPE.TEXT)
    && (isLocalImage(photo, fsKey)
    || validateField(res, photo, INPUT_TYPE.PHOTO)))
  ) {
    return false
  }

  const userPhoto = isLocalImage(photo, fsKey)
    ? photo
    : uploadFiles([photo], HOUSEHOLD_DIR, fsKey)[0]
  if (userPhoto === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }

  const success = await approveInvitation(userId, fromId, householdId, nickname, userPhoto)
  if (success) {
    const householdName = await getHouseholdName(householdId)
    addActivityForUsers(
      [userId],
      `${ACTIVITY.HOUSEHOLD_JOIN}$[${userNickname}, ${householdName}]$`,
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
    )
    res.status(200).send({
      url: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`,
    })
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }
  return true
}

export const handleLeaveHousehold = async (
  userId: number,
  userNickname: string,
  householdId: number,
  res: any,
): Promise<boolean> => {
  const members = await getHouseholdMembers(householdId)
  const admins = members
    ?.filter(({ role }) => role === HOUSEHOLD_ROLE_TYPE.ADMIN)
    ?.map(({ userId }) => userId)

  if (!admins || (admins.length === 1 && admins.indexOf(userId) !== -1)) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
    return false
  }

  const success = await leaveHousehold(userId, householdId)
  if (success) {
    const householdName = await getHouseholdName(householdId)
    const notifiedMembers = members!
      .map(({ userId }) => userId)
      .filter(memberId => memberId !== userId)

    addActivityForUsers(
      notifiedMembers,
      `${ACTIVITY.HOUSEHOLD_LEAVE}$[${userNickname}, ${householdName}]$`,
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
    )
    res.status(204).send()
    return true
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }
  return false
}
