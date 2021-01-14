import {
  getTabList, validateNotificationData, validateProfileData, validateEditHouseholdData,
} from 'serverSrc/helpers/settings'
import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files.'
import {
  findProfileData,
  updateUserData,
  findApprovedConnections,
  findConnections,
  findUserHouseholds,
  findUserInvitations,
  findNotificationSettings,
  updateNotificationSettings,
  editHousehold,
} from 'serverSrc/database/models'
import { SETTING_CATEGORIES, SETTING_TABS, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { HOUSEHOLD_KEYS, PROFILE } from 'shared/constants/settingsDataKeys'

const getTabData = async (category: string, tab: string, req: any) => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === SETTING_TABS.NOTIFICATIONS) {
        return findNotificationSettings(req.session.user)
      }
      return findProfileData(req.session.user)
    case SETTING_CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await findUserInvitations(req.session.user),
        households: await findUserHouseholds(req.session.user),
        connections: await findApprovedConnections(req.session.user),
      }
    case SETTING_CATEGORIES.CONNECTIONS:
      return findConnections(req.session.user)
    default:
      return {}
  }
}

export const handleSettingsDataFetch = async (category: string, tab: string, req: any, res: any): Promise<void> => {
  const data = await getTabData(category, tab, req)
  if (!data) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.CONNECTION_REQUEST_ERROR] })
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

export const handleSettingsDataUpdate = async (
  category: string, tab: string, inputs: Record<string, string | number>, req: any, res: any
): Promise<boolean> => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === SETTING_TABS.GENERAL) {
        const valid = await validateProfileData(inputs, req, res)
        if (!valid) {
          return true
        }
        if (!inputs[PROFILE.PHOTO]) {
          return updateUserData(inputs, req.session.user)
        }
        const [photo] = uploadFiles([inputs[PROFILE.PHOTO] as any], PROFILE_DIR, req.session.fsKey)
        if (photo === null) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
          return true
        }
        return updateUserData({ ...inputs, [PROFILE.PHOTO]: photo }, req.session.user)
      } else if (SETTING_TABS.NOTIFICATIONS) {
        const valid = validateNotificationData(inputs, req, res)
        if (!valid) {
          return true
        }
        return updateNotificationSettings(inputs, req.session.user)
      }
      break
    case SETTING_CATEGORIES.HOUSEHOLDS:
      if (tab === HOUSEHOLD_TABS._HOUSEHOLD) {
        const userId = req.session.user
        const valid = await validateEditHouseholdData(inputs, userId, req, res)
        if (!valid) {
          return true
        }

        const photo = inputs[HOUSEHOLD_KEYS.PHOTO]
          ? uploadFiles([inputs[HOUSEHOLD_KEYS.PHOTO] as any], HOUSEHOLD_DIR, req.session!.fsKey)
          : undefined

        const userPhoto = inputs[HOUSEHOLD_KEYS.USER_PHOTO]
          ? uploadFiles([inputs[HOUSEHOLD_KEYS.USER_PHOTO] as any], HOUSEHOLD_DIR, req.session!.fsKey)
          : undefined

        if (photo === null || userPhoto === null) {
          res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
          return true
        }

        return !(await editHousehold(
          inputs[HOUSEHOLD_KEYS.ID] as number,
          {
            ...inputs,
            [HOUSEHOLD_KEYS.PHOTO]: photo,
            [HOUSEHOLD_KEYS.USER_PHOTO]: userPhoto,
          },
          userId
        ))
      }
      break
  }
  res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_REQUEST] })
  return true
}
