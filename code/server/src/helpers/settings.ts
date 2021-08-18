import { tHouseholdsCols } from 'serverSrc/database/tables'
import {
  findApprovedConnections,
  findConnections,
  findNotificationSettings,
  findProfileData,
  findUserHouseholds,
  findUserInvitations,
} from 'serverSrc/database'
import { findContributors, findSupporters } from 'serverSrc/helpers/externalResources'
import { SETTING_CATEGORIES, HOUSEHOLD_TABS, SETTING_TAB_ROWS, PROFILE_TABS } from 'shared/constants'

export const getTabData = async (category: string, tab: string, req: any) => {
  const userId = req.session.userId

  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === PROFILE_TABS.NOTIFICATIONS) {
        return findNotificationSettings(userId)
      } else if (tab === PROFILE_TABS.GENERAL) {
        return findProfileData(userId)
      }
      return {}
    case SETTING_CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await findUserInvitations(userId),
        households: await findUserHouseholds(userId),
        connections: await findApprovedConnections(userId),
      }
    case SETTING_CATEGORIES.CONNECTIONS:
      return findConnections(userId)
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
