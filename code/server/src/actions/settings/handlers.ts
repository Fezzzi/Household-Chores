import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files'
import { getTabList, tryRemapBoolData } from 'serverSrc/helpers/settings'
import {
  findProfileData, updateUserData, findApprovedConnections, findConnections, findUserHouseholds,
  findUserInvitations, findNotificationSettings, updateNotificationSettings, editHousehold, updateDialogSettings,
  addActivityForUsers, getHouseholdMembers, getHouseholdName,
} from 'serverSrc/database/models'
import { tDialogsCols, tNotifySettingsCols } from 'serverSrc/database/models/tables'
import { findContributors, findSupporters } from 'serverSrc/helpers/externalResources'
import { SETTING_CATEGORIES, PROFILE_TABS, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ACTIVITY, ERROR } from 'shared/constants/localeMessages'
import { SETTINGS_PREFIX } from 'shared/constants/api'

import { HouseholdEditInputs, HouseholdNewInvitation, SettingsUpdateRequestInputs } from './types'
import { validateEditHouseholdData, validateProfileData } from './validate'

const getTabData = async (category: string, tab: string, req: any) => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === PROFILE_TABS.NOTIFICATIONS) {
        return findNotificationSettings(req.session.user)
      } else if (tab === PROFILE_TABS.GENERAL) {
        return findProfileData(req.session.user)
      }
      return {}
    case SETTING_CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await findUserInvitations(req.session.user),
        households: await findUserHouseholds(req.session.user),
        connections: await findApprovedConnections(req.session.user),
      }
    case SETTING_CATEGORIES.CONNECTIONS:
      return findConnections(req.session.user)
    case SETTING_CATEGORIES.MORE:
      return {
        supporters: await findSupporters(),
        contributors: await findContributors(),
      }
    default:
      return {}
  }
}

export const handleSettingsDataFetch = async (category: string, tab: string, req: any, res: any): Promise<void> => {
  const data = await getTabData(category, tab, req)
  if (!data) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] })
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

export const handleSettingsDataUpdate = async (
  category: string, tab: string, inputs: SettingsUpdateRequestInputs, req: any, res: any
): Promise<boolean> => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      switch (tab) {
        case PROFILE_TABS.GENERAL: {
          const valid = await validateProfileData(inputs, req, res)
          if (!valid) {
            return true
          }
          if (!inputs.photo) {
            return handleUpdate(res, await updateUserData(inputs, req.session.user))
          }
          const [photo] = uploadFiles([inputs.photo as any], PROFILE_DIR, req.session.fsKey)
          if (photo === null) {
            res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
            return true
          }
          return handleUpdate(res, await updateUserData({ ...inputs, photo }, req.session.user))
        }
        case PROFILE_TABS.NOTIFICATIONS: {
          const allowedKeys = Object.values(tNotifySettingsCols).filter(name => name !== tNotifySettingsCols.id_user)
          const valueMapper = (val: string | number) => val ? 1 : 0
          const validData = tryRemapBoolData(inputs, allowedKeys, valueMapper, req, res)
          if (!validData) {
            return true
          }
          return handleUpdate(res, await updateNotificationSettings(validData, req.session.user))
        }
        case PROFILE_TABS.DIALOGS: {
          const allowedKeys = Object.values(tDialogsCols).filter(name => name !== tDialogsCols.id_user)
          const valueMapper = (val: string | number) => val ? 0 : 1
          const validData = tryRemapBoolData(inputs, allowedKeys, valueMapper, req, res)
          if (!validData) {
            return true
          }
          const updated = handleUpdate(res, await updateDialogSettings(validData, req.session.user))
          if (!updated) {
            res.status(204).send()
          }
          return true
        }
      }
      break
    case SETTING_CATEGORIES.HOUSEHOLDS:
      if (tab === HOUSEHOLD_TABS._HOUSEHOLD) {
        const householdInputs: HouseholdEditInputs = inputs as any
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

        const success = handleUpdate(res, !!await editHousehold(
          householdId,
          {
            ...householdInputs,
            photo: householdPhoto,
            userPhoto: householdUserPhoto,
          },
          userId
        ))

        if (success && members?.length) {
          handleHouseholdEditActivity(householdId, userId, userNickname, members, removedMembers, newInvitations)
        }
        return success
      }
      break
  }
  res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
  return true
}

const handleHouseholdEditActivity = async (
  householdId: number,
  userId: number,
  userNickname: string,
  members: Array<{ userId: number; role: string }>,
  removedMembers: number[],
  newInvitations: HouseholdNewInvitation[],
) => {
  const householdName = await getHouseholdName(householdId)
  const remainingMembers = members
    .map(({ userId }) => userId)
    .filter(memberId => !removedMembers?.includes(memberId) && memberId !== userId)

  if (remainingMembers?.length) {
    removedMembers.forEach(memberId => {
      addActivityForUsers(
        remainingMembers,
        `${ACTIVITY.HOUSEHOLD_REMOVE}$[${memberId}, ${householdName}, ${userNickname}]$`,
        `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=household-${householdId}`
      )
    })
  }

  const sentInvitations = newInvitations?.map(({ userId }) => userId)

  if (sentInvitations?.length) {
    addActivityForUsers(
      sentInvitations,
      `${ACTIVITY.HOUSEHOLD_INVITATION}$[${userNickname}, ${householdName}]$`,
      `${SETTINGS_PREFIX}/${SETTING_CATEGORIES.HOUSEHOLDS}?tab=${HOUSEHOLD_TABS.INVITATIONS}`
    )
  }
}
