import { findUser, isCorrectPassword } from 'serverSrc/database/models/users'
import HOUSEHOLDS_TABLE from 'serverSrc/database/models/tables/households'
import NOTIFICATION_SETTINGS_TABLE from 'serverSrc/database/models/tables/notification_settings'
import {
  INPUT_TYPE, NOTIFICATION_TYPE, USER_VISIBILITY_TYPE,
  SETTING_CATEGORIES, SETTING_TABS, SETTING_TAB_ROWS,
} from 'shared/constants'
import { PROFILE } from 'shared/constants/settingsDataKeys'
import { ERROR, INFO } from 'shared/constants/localeMessages'
import { isInputValid } from 'shared/helpers/validation'

export const getTabList = (
  data: any,
  category: string
): { tabs: string[]; messages: object; types: object } => {
  switch (category) {
    case SETTING_CATEGORIES.HOUSEHOLDS: return {
      tabs: [
        ...SETTING_TAB_ROWS[category],
        ...data.households.map((household: any) => household.key),
      ],
      messages: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          household[HOUSEHOLDS_TABLE.columns.name],
        ]),
      ),
      types: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          SETTING_TABS._HOUSEHOLD,
        ]),
      ),
    }
    default: return { tabs: SETTING_TAB_ROWS[category], messages: {}, types: {} }
  }
}

export const validateField = (
  res: any,
  field: string | number | undefined,
  type: string,
  constraints?: any
): boolean => {
  if (field !== undefined) {
    const validity = isInputValid(type, field, constraints)
    if (!validity.valid) {
      res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [validity.message || ERROR.INVALID_DATA] })
      return false
    }
  }
  return true
}

export const validateProfileData = async (
  inputs: Record<string, string | number>,
  req: any,
  res: any
): Promise<boolean> => {
  const update = inputs[PROFILE.NAME] !== undefined
    || inputs[PROFILE.EMAIL] !== undefined
    || (inputs[PROFILE.OLD_PASSWORD] !== undefined && inputs[PROFILE.NEW_PASSWORD] !== undefined)
    || inputs[PROFILE.PHOTO] !== undefined
    || inputs[PROFILE.CONNECTION_VISIBILITY] !== undefined

  if (!update) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  const valid = validateField(res, inputs[PROFILE.NAME], INPUT_TYPE.TEXT)
    && validateField(res, inputs[PROFILE.PHOTO], INPUT_TYPE.PHOTO)
    && validateField(res, inputs[PROFILE.EMAIL], INPUT_TYPE.EMAIL)
    && validateField(res, inputs[PROFILE.OLD_PASSWORD], INPUT_TYPE.PASSWORD)
    && validateField(res, inputs[PROFILE.NEW_PASSWORD], INPUT_TYPE.PASSWORD)
    && validateField(res, inputs[PROFILE.CONNECTION_VISIBILITY], INPUT_TYPE.SWITCH, [
      USER_VISIBILITY_TYPE.ALL, USER_VISIBILITY_TYPE.FOF,
    ])

  if (!valid) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }

  if (inputs[PROFILE.EMAIL] !== undefined && await findUser(inputs[PROFILE.EMAIL] as string) !== null) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.EMAIL_USED] })
    return false
  }

  if (inputs[PROFILE.OLD_PASSWORD]
    && !await isCorrectPassword(inputs[PROFILE.OLD_PASSWORD] as string, req.session.user)
  ) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INCORRECT_PASS] })
    return false
  }

  return true
}

export const validateNotificationData = (
  inputs: Record<string, string | number>,
  req: any,
  res: any
): boolean => {
  const inputKeys = Object.keys(inputs)
  if (inputKeys.length === 0) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return false
  }

  if (!inputKeys.every(input =>
    NOTIFICATION_SETTINGS_TABLE.columns[input as keyof typeof NOTIFICATION_SETTINGS_TABLE.columns] !== undefined
  ) && inputs[NOTIFICATION_SETTINGS_TABLE.columns.id_user] === undefined
  ) {
    res.status(200).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return false
  }
  return true
}
