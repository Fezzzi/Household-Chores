import { Response } from 'express'

import {
  NOTIFICATION_TYPE,
  INPUT_TYPE,
  API,
  SETTING_CATEGORIES,
  HOUSEHOLD_TABS,
  HOUSEHOLD_ROLE_TYPE,
} from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { NOTIFICATION_KEYS } from 'serverSrc/constants'
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

import { ApproveInvitationRequest, CreateHouseholdInputs, CreateHouseholdInvitation } from './types'
import { validateCreateData } from './validate'
import { validateField } from '../validate'

export const handleCreateHousehold = async (
  inputs: CreateHouseholdInputs,
  invitations: CreateHouseholdInvitation[],
  userId: number,
  fsKey: string,
  locale: string,
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
      NOTIFICATION_KEYS.HOUSEHOLD_INVITATION,
      locale,
      invitations.map(user => user.toId),
      ACTIVITY.HOUSEHOLD_INVITATION,
      [inputs.name, inputs.userNickname],
      [photo!, userPhoto!],
      `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${HOUSEHOLD_TABS.INVITATIONS}`
    )
    res.status(200).send({
      url: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`,
    })
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }

  return true
}

export const handleDeleteHousehold = async (userId: number, householdId: number, locale: string, res: Response) => {
  const members = await getHouseholdMembers(householdId)
  const user = members?.find(({ userId: memberId }) => userId === memberId)
  const isAdmin = user?.role === HOUSEHOLD_ROLE_TYPE.ADMIN

  if (!isAdmin) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.BAD_PERMISSIONS] })
    return false
  } else {
    const { name, photo } = await getHouseholdInfo(householdId) ?? { name: null, photo: null }
    const success = await deleteHousehold(householdId)

    if (success) {
      const notifiedMembers = members
        .map(({ userId }) => userId)
        .filter(memberId => memberId !== userId)

      logActivity(
        NOTIFICATION_KEYS.HOUSEHOLD_DELETING,
        locale,
        notifiedMembers,
        ACTIVITY.HOUSEHOLD_DELETE,
        [user.nickname, name],
        [photo, user.photo]
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
  locale: string,
  res: Response,
) => {
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
        NOTIFICATION_KEYS.HOUSEHOLD_JOINING,
        locale,
        notifiedMembers,
        ACTIVITY.HOUSEHOLD_JOIN,
        [userNickname, name],
        [photo, userPhoto!],
        `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
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

export const handleLeaveHousehold = async (userId: number, householdId: number, locale: string, res: Response) => {
  const members = await getHouseholdMembers(householdId)
  const admins = members
    ?.filter(({ role }) => role === HOUSEHOLD_ROLE_TYPE.ADMIN)
    ?.map(({ userId }) => userId)

  if (!admins || (admins.length === 1 && admins.includes(userId))) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ADMIN_REQUIRED] })
    return false
  }

  const user = members.find(({ userId: id }) => id === userId)
  const success = user && await leaveHousehold(userId, householdId)

  if (success) {
    const { nickname: userNickname, photo: userPhoto } = user
    const { name, photo } = await getHouseholdInfo(householdId)

    const notifiedMembers = members
      .map(({ userId }) => userId)
      .filter(memberId => memberId !== userId)

    logActivity(
      NOTIFICATION_KEYS.HOUSEHOLD_LEAVING,
      locale,
      notifiedMembers,
      ACTIVITY.HOUSEHOLD_LEAVE,
      [userNickname, name],
      [photo, userPhoto],
      `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
    )
    res.status(204).send()
    return true
  } else {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
  }
  return false
}
