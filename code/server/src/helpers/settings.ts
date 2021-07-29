import { tHouseholdsCols } from 'serverSrc/database/models/tables'
import {
  findApprovedConnections, findConnections, findNotificationSettings,
  findProfileData, findUserHouseholds, findUserInvitations,
} from 'serverSrc/database/models'
import { deApify } from 'serverSrc/helpers/api'
import { findContributors, findSupporters } from 'serverSrc/helpers/externalResources'
import { NOTIFICATION_TYPE, SETTING_CATEGORIES, HOUSEHOLD_TABS, SETTING_TAB_ROWS, PROFILE_TABS } from 'shared/constants'
import { ERROR, INFO } from 'shared/constants/localeMessages'

export const getTabData = async (category: string, tab: string, req: any) => {
  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === PROFILE_TABS.NOTIFICATIONS) {
        return findNotificationSettings(req.session.userId)
      } else if (tab === PROFILE_TABS.GENERAL) {
        return findProfileData(req.session.userId)
      }
      return {}
    case SETTING_CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await findUserInvitations(req.session.userId),
        households: await findUserHouseholds(req.session.userId),
        connections: await findApprovedConnections(req.session.userId),
      }
    case SETTING_CATEGORIES.CONNECTIONS:
      return findConnections(req.session.userId)
    case SETTING_CATEGORIES.MORE:
      return {
        supporters: await findSupporters(),
        contributors: await findContributors(),
      }
    default:
      return {}
  }
}

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

export const tryRemapBoolData = (
  inputs: Record<string, any>,
  allowedKeys: string[],
  valueMapper: (val: any) => number,
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
