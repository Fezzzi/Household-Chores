import HOUSEHOLD_INVITATIONS_TABLE from './household_invitations'
import HOUSEHOLD_MEMBERS_TABLE from './household_members'
import HOUSEHOLDS_TABLE from './households'

export * from './users'
export * from './connections'
export * from './activity'
export * from './dialogs'
export * from './notificationSettings'

const { name: tHouseInvName, columns: tHouseInvCols } = HOUSEHOLD_INVITATIONS_TABLE
const { name: tHouseMemName, columns: tHouseMemCols } = HOUSEHOLD_MEMBERS_TABLE
const { name: tHouseholdsName, columns: tHouseholdsCols } = HOUSEHOLDS_TABLE

export { tHouseInvName, tHouseInvCols, tHouseMemName, tHouseMemCols, tHouseholdsName, tHouseholdsCols }
