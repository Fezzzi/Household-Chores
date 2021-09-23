import { Response } from 'express'

import { API, SETTING_CATEGORIES, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { NOTIFICATION_KEYS } from 'api/constants'
import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'api/helpers/files'
import { getTabData, getTabList } from 'api/helpers/settings'
import { logActivity } from 'api/helpers/activity'
import { encryptPass } from 'api/helpers/passwords'
import {
  updateUserData,
  updateNotificationSettings,
  editHousehold,
  updateDialogSettings,
  addActivityForUsers,
  getHouseholdMembers,
  getHouseholdInfo,
  getHouseholdMemberInfo,
} from 'api/database'
import {
  mapFromEditHouseholdMemberApiType,
  mapFromEditHouseholdApiType,
  mapFromUserEditApiType,
  mapFromUserDialogsUnforcedApiType,
  mapFromNotifySettingsUnforcedApiType,
  UserDialogsUnforcedApiType,
  NotifySettingsUnforcedApiType,
} from 'api/database/mappers'

import { GeneralEditInputs, HouseholdEditInputs, HouseholdNewInvitation } from './types'
import { validateEditHouseholdData, validateProfileData } from './validate'

export const handleSettingsDataFetch = async (category: string, tab: string, req: any, res: Response) => {
  const data = await getTabData(category, tab, req)
  if (!data) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return
  }

  const { tabs, messages: tabMessages, types: tabTypes } = getTabList(data, category)
  res.status(200).send({
    tabs,
    data,
    tabMessages,
    tabTypes,
  })
}

const handleUpdate = async (res: Response, updated: Promise<boolean>, confirmResponse = false) => {
  if (!await updated) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  } else if (confirmResponse) {
    res.status(204).send()
    return true
  }
  return false
}

export const handleNotificationsEdit = async (userId: number, inputs: NotifySettingsUnforcedApiType, res: Response) => {
  const inputCols = mapFromNotifySettingsUnforcedApiType(inputs)
  if (Object.keys(inputCols).length === 0) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  return handleUpdate(res, updateNotificationSettings(inputCols, userId), true)
}

export const handleDialogsEdit = async (userId: number, inputs: UserDialogsUnforcedApiType, res: Response) => {
  const inputCols = mapFromUserDialogsUnforcedApiType(inputs)
  if (Object.keys(inputCols).length === 0) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  return handleUpdate(res, updateDialogSettings(inputCols, userId), true)
}

export const handleGeneralEdit = async (userId: number, fsKey: string, inputs: GeneralEditInputs, res: Response) => {
  const valid = await validateProfileData(userId, inputs, res)
  if (!valid) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return true
  }

  const [newPhoto] = uploadFiles([inputs.photo], PROFILE_DIR, fsKey, res)

  const newPassword = inputs.newPassword && await encryptPass(inputs.newPassword)

  const mappedUserData = mapFromUserEditApiType(inputs, newPhoto, newPassword)
  return handleUpdate(res, updateUserData(mappedUserData, userId))
}

export const handleHouseholdEdit = async (
  userId: number,
  fsKey: string,
  locale: string,
  householdInputs: HouseholdEditInputs,
  res: Response
) => {
  const {
    householdId,
    photo,
    userPhoto,
    newInvitations,
    changedRoles,
    removedMembers,
    removedInvitations,
  } = householdInputs

  if (!householdId) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return true
  }
  const members = await getHouseholdMembers(householdId)
  const valid = await validateEditHouseholdData(householdInputs, members, userId, res)
  if (!valid) {
    return true
  }

  const [householdPhoto, householdUserPhoto] = uploadFiles([photo, userPhoto], HOUSEHOLD_DIR, fsKey, res)

  const mappedMemberData = mapFromEditHouseholdMemberApiType({
    userNickname: householdInputs.userNickname,
    userPhoto: householdUserPhoto,
    userRole: householdInputs.userRole,
  })

  const mappedHouseholdData = mapFromEditHouseholdApiType({
    name: householdInputs.name,
    photo: householdPhoto,
  })

  await editHousehold(
    householdId,
    userId,
    mappedMemberData,
    mappedHouseholdData,
    newInvitations,
    changedRoles,
    removedMembers,
    removedInvitations
  )

  if (members?.length) {
    handleHouseholdEditActivity(householdId, userId, locale, members, removedMembers, newInvitations)
  }
  res.status(204).send()
  return true
}

const handleHouseholdEditActivity = async (
  householdId: number,
  userId: number,
  locale: string,
  members: Array<{ userId: number; role: string; nickname: string }>,
  removedMemberIds: number[] = [],
  newInvitations: HouseholdNewInvitation[] = [],
) => {
  const { name: householdName, photo: householdPhoto } = await getHouseholdInfo(householdId) ?? { name: null, photo: null }
  const removedMemberNicknames = members
    .filter(({ userId }) => removedMemberIds.includes(userId))
    .map(({ nickname }) => nickname)

  const remainingOtherMemberIds = members
    .map(({ userId }) => userId)
    .filter(memberId => !removedMemberIds.includes(memberId) && memberId !== userId)

  const isActivityToLog = removedMemberIds.length || removedMemberNicknames.length || newInvitations.length
  if (isActivityToLog) {
    const { photo: userPhoto, nickname: userNickname } = await getHouseholdMemberInfo(householdId, userId)

    if (removedMemberNicknames.length === 1) {
      logActivity(
        NOTIFICATION_KEYS.HOUSEHOLD_REMOVAL,
        locale,
        remainingOtherMemberIds,
        ACTIVITY.HOUSEHOLD_REMOVAL,
        [removedMemberNicknames[0], userNickname, householdName],
        [householdPhoto, userPhoto],
        `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
      )
    } else if (remainingOtherMemberIds.length > 1) {
      logActivity(
        NOTIFICATION_KEYS.HOUSEHOLD_REMOVAL,
        locale,
        remainingOtherMemberIds,
        ACTIVITY.HOUSEHOLD_REMOVAL_MULTIPLE,
        [removedMemberNicknames[0], String(removedMemberNicknames.length - 1), userNickname, householdName],
        [householdPhoto, userPhoto],
        `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
      )
    }

    // We don't send email to expelled members, just pop an activity message
    removedMemberNicknames.forEach(memberNickname => {
      addActivityForUsers(
        removedMemberIds,
        ACTIVITY.HOUSEHOLD_EXPELLING,
        [memberNickname, householdName, userNickname],
        [householdPhoto, userPhoto],
      )
    })

    const sentInvitationIds = newInvitations.map(({ userId }) => userId)
    logActivity(
      NOTIFICATION_KEYS.HOUSEHOLD_INVITATION,
      locale,
      sentInvitationIds,
      ACTIVITY.HOUSEHOLD_INVITATION,
      [householdName, userNickname],
      [householdPhoto, userPhoto],
      `${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.INVITATIONS}`
    )
  }
}
