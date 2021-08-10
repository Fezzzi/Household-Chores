import { HouseholdEditInputs } from 'serverSrc/actions/settings/types'

import { tHouseholdsCols, tHouseMemCols } from '../tables'

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
  name: HouseholdEditInputs['name']
  photo?: string
}

export type HouseholdEditDbType = {
  [tHouseholdsCols.name]: HouseholdEditApiType['name']
  [tHouseholdsCols.photo]: HouseholdEditApiType['photo']
}

export const mapFromEditHouseholdApiType = (apiHousehold: HouseholdEditApiType): HouseholdEditDbType => ({
  [tHouseholdsCols.name]: apiHousehold.name,
  [tHouseholdsCols.photo]: apiHousehold.photo,
})
