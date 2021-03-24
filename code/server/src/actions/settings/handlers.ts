import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files'
import { getTabData, getTabList, tryRemapBoolData } from 'serverSrc/helpers/settings'
import { logActivity } from 'serverSrc/helpers/activity'
import {
  updateUserData, updateNotificationSettings, editHousehold, updateDialogSettings,
  addActivityForUsers, getHouseholdMembers, getHouseholdName,
} from 'serverSrc/database/models'
import { tDialogsCols, tNotifySettingsCols } from 'serverSrc/database/models/tables'
import { NOTIFICATIONS } from 'serverSrc/constants'
import { SETTING_CATEGORIES, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'

import {
  DialogEditInputs, GeneralEditInputs, HouseholdEditInputs, HouseholdNewInvitation, NotificationEditInputs,
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

const handleUpdate = (res: any, updated: boolean): boolean => {
  if (!updated) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  }
  return false
}

export const handleNotificationsEdit = async (inputs: NotificationEditInputs, req: any, res: any): Promise<boolean> => {
  const allowedKeys = Object.values(tNotifySettingsCols).filter(name => name !== tNotifySettingsCols.id_user)
  const valueMapper = (val: string | number) => val ? 1 : 0
  const validData = tryRemapBoolData(inputs, allowedKeys, valueMapper, req, res)
  if (!validData) {
    return true
  }
  return handleUpdate(res, await updateNotificationSettings(validData, req.session.user))
}

export const handleDialogsEdit = async (inputs: DialogEditInputs, req: any, res: any): Promise<boolean> => {
  const allowedKeys = Object.values(tDialogsCols).filter(name => name !== tDialogsCols.id_user)
  const valueMapper = (val: boolean) => val ? 0 : 1
  const validData = tryRemapBoolData(inputs, allowedKeys, valueMapper, req, res)
  if (!validData) {
    return true
  }
  const error = handleUpdate(res, await updateDialogSettings(validData, req.session.user))
  if (!error) {
    res.status(204).send()
  }
  return true
}

export const handleGeneralEdit = async (inputs: GeneralEditInputs, req: any, res: any): Promise<boolean> => {
  const valid = await validateProfileData(inputs, req, res)
  if (!valid) {
    return true
  }
  if (!inputs.photo) {
    return handleUpdate(res, await updateUserData(inputs, req.session.user))
  }
  const [photo] = uploadFiles([inputs.photo], PROFILE_DIR, req.session.fsKey)
  if (photo === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }
  return handleUpdate(res, await updateUserData({ ...inputs, photo }, req.session.user))
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
    removedMembers,
    newInvitations,
  } = householdInputs
  const { user: userId, userNickname, fsKey } = req.session
  if (!householdId) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return true
  }
  const members = await getHouseholdMembers(householdId)
  const valid = await validateEditHouseholdData(householdInputs, members, userId, req, res)
  if (!valid) {
    return true
  }

  const householdPhoto = photo
    ? uploadFiles([photo], HOUSEHOLD_DIR, fsKey)
    : undefined

  const householdUserPhoto = householdInputs.userPhoto
    ? uploadFiles([userPhoto], HOUSEHOLD_DIR, fsKey)
    : undefined

  if (householdPhoto === null || householdUserPhoto === null) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
    return true
  }

  const error = handleUpdate(res, !!await editHousehold(
    householdId,
    {
      ...householdInputs,
      photo: householdPhoto,
      userPhoto: householdUserPhoto,
    },
    userId
  ))

  if (!error && members?.length) {
    handleHouseholdEditActivity(householdId, userId, userNickname, members, removedMembers, newInvitations)
  }
  return error
}

const handleHouseholdEditActivity = async (
  householdId: number,
  userId: number,
  userNickname: string,
  members: Array<{ userId: number; role: string; nickname: string }>,
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
