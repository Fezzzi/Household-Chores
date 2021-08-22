import { Response } from 'express'

import { HOUSEHOLD_DIR, isLocalImage, uploadFiles } from 'serverSrc/helpers/files'
import { logActivity } from 'serverSrc/helpers/activity'
import {
  addHouseholdInvitations,
  approveInvitation,
  createHousehold,
  deleteHousehold,
  getHouseholdInfo,
  getHouseholdMembers,
  leaveHousehold,
} from 'serverSrc/database'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { NOTIFICATION_TYPE, INPUT_TYPE, API, SETTING_CATEGORIES, HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'

import { ApproveInvitationRequest, CreateHouseholdInputs, CreateHouseholdInvitation } from './types'
import { validateCreateData } from './validate'
import { validateField } from '../validate'

export const handleCreateHousehold = async (
  inputs: CreateHouseholdInputs,
  invitations: CreateHouseholdInvitation[],
  userId: number,
  fsKey: string,
  res: Response,
): Promise<boolean> => {
  const valid = await validateCreateData(inputs, invitations, userId, res)
  if (!valid) {
    return true
  }

  const [photo, userPhoto] = uploadFiles([inputs.photo, inputs.userPhoto], HOUSEHOLD_DIR, fsKey, res)

  const householdId = await createHousehold(
    inputs.name,
    photo!,
    inputs.userNickname,
    userPhoto!,
    userId
  )

  if (householdId === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  }
  const success = invitations.length === 0 || await addHouseholdInvitations(householdId, invitations, userId)
  if (success) {
    logActivity(
      NOTIFICATIONS.HOUSEHOLD_INVITATION,
      invitations.map(user => user.toId),
      `${ACTIVITY.HOUSEHOLD_INVITATION}$[${inputs.name}, ${inputs.userNickname}]$`,
      [inputs.name, inputs.userNickname],
      [photo!, userPhoto!],
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
  res: Response,
): Promise<boolean> => {
  const members = await getHouseholdMembers(householdId)
  const isAdmin = members?.find(({ userId: memberId }) => userId === memberId)?.role === HOUSEHOLD_ROLE_TYPE.ADMIN

  if (!isAdmin) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
    return false
  } else {
    const { name, photo } = await getHouseholdInfo(householdId) ?? { name: null, photo: null }
    const success = await deleteHousehold(householdId)

    if (success) {
      const notifiedMembers = members!
        .map(({ userId }) => userId)
        .filter(memberId => memberId !== userId)

      logActivity(
        NOTIFICATIONS.HOUSEHOLD_DELETING,
        notifiedMembers,
        `${ACTIVITY.HOUSEHOLD_DELETE}$[${userNickname}, ${name}]$`,
        [userNickname, name],
        [photo]
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
  res: Response,
): Promise<boolean> => {
  const { fromId, householdId, userNickname: nickname, userPhoto: photo } = invitationBody

  if (!fromId || !householdId || !nickname || !photo) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (!(validateField(res, nickname, INPUT_TYPE.TEXT)
    && (isLocalImage(photo, fsKey) || validateField(res, photo, INPUT_TYPE.PHOTO)))
  ) {
    return false
  }

  const [userPhoto] = uploadFiles([photo], HOUSEHOLD_DIR, fsKey, res)
  const success = await approveInvitation(userId, fromId, householdId, nickname, userPhoto!)

  if (success) {
    const { name, photo } = await getHouseholdInfo(householdId)
    const members = await getHouseholdMembers(householdId)
    const notifiedMembers = members?.map(({ userId }) => userId).filter(memberId => memberId !== userId)
    if (notifiedMembers?.length) {
      logActivity(
        NOTIFICATIONS.HOUSEHOLD_JOINING,
        notifiedMembers,
        `${ACTIVITY.HOUSEHOLD_JOIN}$[${userNickname}, ${name}]$`,
        [userNickname, name],
        [photo, userPhoto!],
        `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
      )
    }
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
  res: Response,
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
    const { name, photo } = await getHouseholdInfo(householdId)
    const notifiedMembers = members!
      .map(({ userId }) => userId)
      .filter(memberId => memberId !== userId)

    logActivity(
      NOTIFICATIONS.HOUSEHOLD_LEAVING,
      notifiedMembers,
      `${ACTIVITY.HOUSEHOLD_LEAVE}$[${userNickname}, ${name}]$`,
      [userNickname, name],
      [photo],
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
    )
    res.status(204).send()
    return true
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }
  return false
}
