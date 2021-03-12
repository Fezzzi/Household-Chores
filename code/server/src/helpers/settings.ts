import { tHouseholdsCols } from 'serverSrc/database/models/tables'
import { deApify } from 'serverSrc/helpers/api'
import { RequestImage } from 'serverSrc/actions/types'
import { NOTIFICATION_TYPE, SETTING_CATEGORIES, HOUSEHOLD_TABS, SETTING_TAB_ROWS } from 'shared/constants'
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
          household[tHouseholdsCols.name],
        ]),
      ),
      types: Object.fromEntries(
        data.households.map((household: any) => [
          household.key,
          HOUSEHOLD_TABS._HOUSEHOLD,
        ]),
      ),
    }
    default: return { tabs: SETTING_TAB_ROWS[category], messages: {}, types: {} }
  }
}

export const validateField = (
  res: any,
  field: string | number | RequestImage | undefined,
  type: string,
  constraints?: any
): boolean => {
  if (field !== undefined) {
    const validity = isInputValid(type, field, constraints)
    if (!validity.valid) {
      res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [validity.message || ERROR.INVALID_DATA] })
      return false
    }
  }
  return true
}

export const tryRemapBoolData = (
  inputs: Record<string, string | number>,
  allowedKeys: string[],
  valueMapper: (val: string | number) => number,
  req: any,
  res: any
): Record<string, number> | null => {
  const inputEntries = Object.entries(deApify(inputs))
  if (inputEntries.length === 0) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [INFO.NOTHING_TO_UPDATE] })
    return null
  }

  if (!inputEntries.every(([name]) => allowedKeys.includes(name))) {
    res.status(400).send({ [NOTIFICATION_TYPE.ERRORS]: [ERROR.INVALID_DATA] })
    return null
  }
  return Object.fromEntries(inputEntries.map(([name, value]) => [name, valueMapper(value)]))
}
