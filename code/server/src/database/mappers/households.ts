import { HouseholdEditInputs } from 'serverSrc/actions/settings/types'
import { apifyObject, deApifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import { tHouseholdsCols, THouseholdsType, tHouseMemCols, THouseMemType } from '../tables'

export type HouseholdEditMemberApiType = {
  userNickname: HouseholdEditInputs['userNickname']
  userPhoto?: string
  userRole: HouseholdEditInputs['userRole']
}

export type HouseholdEditMemberDbType = {
  [tHouseMemCols.nickname]?: HouseholdEditMemberApiType['userNickname']
  [tHouseMemCols.photo]?: HouseholdEditMemberApiType['userPhoto']
  [tHouseMemCols.role]?: HouseholdEditMemberApiType['userRole']
}

export const mapFromEditHouseholdMemberApiType = (apiMembers: HouseholdEditMemberApiType): HouseholdEditMemberDbType => ({
  [tHouseMemCols.nickname]: apiMembers.userNickname,
  [tHouseMemCols.photo]: apiMembers.userPhoto,
  [tHouseMemCols.role]: apiMembers.userRole,
})

export type HouseholdEditApiType = {
  name?: HouseholdEditInputs['name']
  photo?: string
}

export type HouseholdEditDbType = Pick<THouseholdsType, typeof tHouseholdsCols.name | typeof tHouseholdsCols.photo>
export type HouseholdEditUnforcedDbType = { [key in keyof HouseholdEditDbType]?: HouseholdEditDbType[key] }

export const mapFromEditHouseholdApiType = (household: HouseholdEditApiType): HouseholdEditUnforcedDbType =>
  deApifyObject(household)

export type HouseholdMemberDbType =
  Pick<THouseMemType, typeof tHouseMemCols.user_id | typeof tHouseMemCols.role | typeof tHouseMemCols.nickname>

export type HouseholdMemberApiType = SnakeCaseObjectToCamelCase<HouseholdMemberDbType>

export const mapToHouseholdMemberApiType = (member: HouseholdMemberDbType): HouseholdMemberApiType =>
  apifyObject(member)
