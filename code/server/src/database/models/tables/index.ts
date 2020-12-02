import ACTIVITY_TABLE from './activity'
import CONNECTIONS_TABLE from './connections'
import HOUSEHOLD_INVITATIONS_TABLE from './household_invitations'
import HOUSEHOLD_MEMBERS_TABLE from './household_members'
import HOUSEHOLDS_TABLE from './households'
import NOTIFICATION_SETTINGS_TABLE from './notification_settings'
import USERS_TABLE from './users'

const { name: tActivityName, columns: tActivityCols } = ACTIVITY_TABLE
const { name: tConnectionsName, columns: tConnectionsCols } = CONNECTIONS_TABLE
const { name: tHouseInvName, columns: tHouseInvCols } = HOUSEHOLD_INVITATIONS_TABLE
const { name: tHouseMemName, columns: tHouseMemCols } = HOUSEHOLD_MEMBERS_TABLE
const { name: tHouseholdsName, columns: tHouseholdsCols } = HOUSEHOLDS_TABLE
const { name: tNotifySettingsName, columns: tNotifySettingsCols } = NOTIFICATION_SETTINGS_TABLE
const { name: tUsersName, columns: tUsersCols } = USERS_TABLE

export {
  tActivityName, tActivityCols, tConnectionsName, tConnectionsCols, tHouseInvName, tHouseInvCols,
  tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols, tNotifySettingsName, tNotifySettingsCols,
  tUsersName, tUsersCols,
}
