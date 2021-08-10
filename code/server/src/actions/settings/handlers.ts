import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files'
import { getTabData, getTabList } from 'serverSrc/helpers/settings'
import { logActivity } from 'serverSrc/helpers/activity'
import {
  updateUserData,
  updateNotificationSettings,
  editHousehold,
  updateDialogSettings,
  addActivityForUsers,
  getHouseholdMembers,
  getHouseholdName,
  DialogSettingsColumn,
  dialogSettingsColumns,
  NotificationSettingsColumn,
  notificationSettingsColumns,
} from 'serverSrc/database'
import {
  mapFromEditHouseholdMemberApiType,
  mapFromEditHouseholdApiType,
  mapFromUserEditApiType,
} from 'serverSrc/database/mappers'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { deApify } from 'serverSrc/helpers/api'
import { SETTING_CATEGORIES, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR, INFO } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'
import { encryptPass } from 'serverSrc/helpers/passwords'

import {
  DialogEditInputs,
  GeneralEditInputs,
  HouseholdEditInputs,
  HouseholdNewInvitation,
  NotificationEditInputs,
} from './types'
import { validateEditHouseholdData, validateProfileData } from './validate'

export const handleSettingsDataFetch = async (category: string, tab: string, req: any, res: any): Promise<void> => {
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

const handleUpdate = async (
  res: any,
  updated: Promise<boolean>,
  confirmResponse = false
): Promise<boolean> => {
  if (!await updated) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  } else if (confirmResponse) {
    res.status(204).send()
  }
  return false
}

const validateInputKeys = <T extends string>(
  inputs: Record<string, boolean>,
  allowedKeys: string[],
  res: any
): inputs is Record<T, boolean> => {
  if (!Object.keys(inputs).every(key => key in allowedKeys)) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (Object.keys(inputs).length === 0) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }
  return true
}

export const handleNotificationsEdit = async (inputs: NotificationEditInputs, req: any, res: any): Promise<boolean> => {
  const inputCols = deApify(inputs)
  if (!validateInputKeys<NotificationSettingsColumn>(inputCols, notificationSettingsColumns, res)) {
    return true
  }

  return handleUpdate(res, updateNotificationSettings(inputCols, req.session.userId), true)
}

export const handleDialogsEdit = async (inputs: DialogEditInputs, req: any, res: any): Promise<boolean> => {
  const inputCols = deApify(inputs)
  if (!validateInputKeys<DialogSettingsColumn>(inputCols, dialogSettingsColumns, res)) {
    return true
  }

  return handleUpdate(res, updateDialogSettings(inputCols, req.session.userId), true)
}

export const handleGeneralEdit = async (inputs: GeneralEditInputs, req: any, res: any): Promise<boolean> => {
  const valid = await validateProfileData(inputs, req, res)
  if (!valid) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return true
  }

  const [newPhoto] = uploadFiles([inputs.photo], PROFILE_DIR, req.session.fsKey, res)

  const newPassword = inputs.newPassword && await encryptPass(inputs.newPassword)

  const mappedUserData = mapFromUserEditApiType(inputs, newPhoto, newPassword)
  return handleUpdate(res, updateUserData(mappedUserData, req.session.userId))
}

export const handleHouseholdEdit = async (
  householdInputs: HouseholdEditInputs,
  req: any,
  res: any
): Promise<boolean> => {
  const {
    householdId,
    photo,
    userPhoto,
    newInvitations,
    changedRoles,
    removedMembers,
    removedInvitations,
  } = householdInputs

  const { userId, userNickname, fsKey } = req.session
  if (!householdId) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return true
  }
  const members = await getHouseholdMembers(householdId)
  const valid = await validateEditHouseholdData(householdInputs, members, userId, req, res)
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
    mappedMemberData,
    mappedHouseholdData,
    newInvitations,
    changedRoles,
    removedMembers,
    removedInvitations,
    userId
  )
  res.status(204).send()

  if (members?.length) {
    handleHouseholdEditActivity(householdId, userId, userNickname, members, removedMembers, newInvitations)
  }
  return true
}

const handleHouseholdEditActivity = async (
  householdId: number,
  userId: number,
  userNickname: string,
  members: Array<{ userId: number; role: string; nickname: string | null }>,
  removedMemberIds: number[],
  newInvitations: HouseholdNewInvitation[],
) => {
  const householdName = await getHouseholdName(householdId)
  const removedMemberNicknames = members
    .filter(({ userId }) => removedMemberIds?.includes(userId))
    .map(({ nickname }) => nickname)

  const remainingMembers = members
    .map(({ userId }) => userId)
    .filter(memberId => !removedMemberIds?.includes(memberId) && memberId !== userId)

  if (remainingMembers?.length) {
    logActivity(
      NOTIFICATIONS.HOUSEHOLD_EXPELLING,
      removedMemberIds,
      `${ACTIVITY.HOUSEHOLD_REMOVE_YOU}$[${userNickname}, ${householdName}]$`
    )

    removedMemberNicknames.forEach(memberNickname => {
      addActivityForUsers(
        remainingMembers,
        `${ACTIVITY.HOUSEHOLD_REMOVE}$[${memberNickname}, ${householdName}, ${userNickname}]$`,
        `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
      )
    })
  }

  const sentInvitations = newInvitations?.map(({ userId }) => userId)

  if (sentInvitations?.length) {
    logActivity(
      NOTIFICATIONS.HOUSEHOLD_INVITATION,
      sentInvitations,
      `${ACTIVITY.HOUSEHOLD_INVITATION}$[${householdName}, ${userNickname}]$`,
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.INVITATIONS}`
    )
  }
}
