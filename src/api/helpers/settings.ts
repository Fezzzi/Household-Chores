import { tHouseholdsCols } from 'api/database/tables'
import {
  getApprovedConnections,
  getConnections,
  getNotificationSettings,
  getProfileData,
  getUserInvitations,
  getUserHouseholdsData,
} from 'api/database'
import { findContributors, findSupporters } from 'api/helpers/externalResources'
import { SETTING_CATEGORIES, HOUSEHOLD_TABS, SETTING_TAB_ROWS, PROFILE_TABS } from 'shared/constants'

export const getTabData = async (category: string, tab: string, req: any) => {
  const userId = req.session.userId

  switch (category) {
    case SETTING_CATEGORIES.PROFILE:
      if (tab === PROFILE_TABS.NOTIFICATIONS) {
        return getNotificationSettings(userId)
      } else if (tab === PROFILE_TABS.GENERAL) {
        return getProfileData(userId)
      }
      return {}
    case SETTING_CATEGORIES.HOUSEHOLDS:
      return {
        invitations: await getUserInvitations(userId),
        households: await getUserHouseholdsData(userId, true, true),
        connections: await getApprovedConnections(userId),
      }
    case SETTING_CATEGORIES.CONNECTIONS:
      return getConnections(userId)
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
): { tabs: string[]; messages: Record<string, string>; types: Record<string, string> } => {
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
