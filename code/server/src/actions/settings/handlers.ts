import { HOUSEHOLD_DIR, PROFILE_DIR, uploadFiles } from 'serverSrc/helpers/files'
import {
  getTabList, validateProfileData, validateEditHouseholdData, tryRemapBoolData } from 'serverSrc/helpers/settings'
import {
  findProfileData, updateUserData, findApprovedConnections, findConnections, findUserHouseholds,
  findUserInvitations, findNotificationSettings, updateNotificationSettings, editHousehold, updateDialogSettings,
} from 'serverSrc/database/models'
import { SETTING_CATEGORIES, PROFILE_TABS, HOUSEHOLD_TABS, NOTIFICATION_TYPE } from 'shared/constants'
import { ERROR } from 'shared/constants/localeMessages'
import { HOUSEHOLD_KEYS } from 'shared/constants/mappingKeys'
import { tDialogsCols, tNotifySettingsCols } from 'serverSrc/database/models/tables'

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

const handleUpdate = (res: any, updated: boolean): boolean => {
  if (!updated) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.ACTION_ERROR] })
    return true
  }
  return false
}

export const handleSettingsDataUpdate = async (
  category: string, tab: string, inputs: Record<string, string | number>, req: any, res: any
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
            res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.UPLOADING_ERROR] })
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
            res.status(200).send({})
          }
          return true
        }
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

        return handleUpdate(res, !!await editHousehold(
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
