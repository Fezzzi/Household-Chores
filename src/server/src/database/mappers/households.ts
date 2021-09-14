import { HouseholdEditInputs } from 'serverSrc/actions/settings/types'
import { apifyObject, deApifyObject, SnakeCaseObjectToCamelCase } from 'serverSrc/helpers/api'

import {
  tHouseholdsCols,
  THouseholdsType,
  tHouseInvCols,
  THouseInvType,
  tHouseMemCols,
  THouseMemType,
  tUsersCols,
  TUsersType,
} from '../tables'

export type HouseholdEditMemberDbType =
  Pick<THouseMemType, typeof tHouseMemCols.nickname | typeof tHouseMemCols.photo | typeof tHouseMemCols.role>
export type HouseholdEditMemberUnforcedDbType = { [key in keyof HouseholdEditMemberDbType]?: HouseholdEditMemberDbType[key] }

export type HouseholdEditMemberUnforcedApiType = {
  userNickname?: HouseholdEditInputs['userNickname']
  userPhoto?: string
  userRole?: HouseholdEditInputs['userRole']
}

export const mapFromEditHouseholdMemberApiType = (apiMembers: HouseholdEditMemberUnforcedApiType): HouseholdEditMemberUnforcedDbType =>
  Object.fromEntries([
    [[tHouseMemCols.nickname], apiMembers.userNickname],
    [[tHouseMemCols.photo], apiMembers.userPhoto],
    [[tHouseMemCols.role], apiMembers.userRole],
  ].filter(([, val]) => val !== undefined))

export type HouseholdEditDbType = Pick<THouseholdsType, typeof tHouseholdsCols.name | typeof tHouseholdsCols.photo>
export type HouseholdEditUnforcedDbType = { [key in keyof HouseholdEditDbType]?: HouseholdEditDbType[key] }

export type HouseholdEditUnforcedApiType = {
  name?: HouseholdEditInputs['name']
  photo?: string
}

export const mapFromEditHouseholdApiType = (household: HouseholdEditUnforcedApiType): HouseholdEditUnforcedDbType =>
  deApifyObject(household)

export type HouseholdMemberDbType = Pick<THouseMemType,
  typeof tHouseMemCols.user_id | typeof tHouseMemCols.role | typeof tHouseMemCols.nickname | typeof tHouseMemCols.photo
>

export type HouseholdMemberApiType = SnakeCaseObjectToCamelCase<HouseholdMemberDbType>

export const mapToHouseholdMemberApiType = (member: HouseholdMemberDbType): HouseholdMemberApiType =>
  apifyObject(member)

export type HouseholdInvitationDbType = Omit<THouseInvType, typeof tHouseInvCols.to_id> & {
    household_name: THouseholdsType[typeof tHouseholdsCols.name]
    household_phto: THouseholdsType[typeof tHouseholdsCols.photo]
  } & {
    from_nickname: THouseMemType[typeof tHouseMemCols.nickname]
    from_photo: THouseMemType[typeof tHouseMemCols.photo]
  }

export type HouseholdInvitationApiType = SnakeCaseObjectToCamelCase<HouseholdInvitationDbType>

export const mapToHouseholdInvitationApiType = (invitation: HouseholdInvitationDbType): HouseholdInvitationApiType =>
  apifyObject(invitation)

export type HouseholdDbType = THouseholdsType & { key: string }
export type HouseholdApiType = SnakeCaseObjectToCamelCase<HouseholdDbType>

export const mapToHouseholdApiType = (household: HouseholdDbType): HouseholdApiType =>
  apifyObject(household)

export type HouseholdsMembersDbType = Pick<THouseMemType,
  typeof tHouseMemCols.household_id | typeof tHouseMemCols.user_id
  | typeof tHouseMemCols.nickname | typeof tHouseMemCols.role | typeof tHouseMemCols.date_joined
>

export type HouseholdsMembersApiType = SnakeCaseObjectToCamelCase<HouseholdsMembersDbType>
export type HouseholdsMembersMapApiType = SnakeCaseObjectToCamelCase<
  Omit<HouseholdsMembersDbType, typeof tHouseMemCols.household_id>
>

export const mapToHouseholdsMembersApiType = (member: HouseholdsMembersDbType): HouseholdsMembersApiType =>
  apifyObject(member)

export type HouseholdsInvitationsDbType = THouseInvType & {
  to_nickname: TUsersType[typeof tUsersCols.nickname]
  to_photo: TUsersType[typeof tUsersCols.photo]
}

export type HouseholdsInvitationsApiType = SnakeCaseObjectToCamelCase<HouseholdsInvitationsDbType>
export type HouseholdsInvitationsMapApiType = SnakeCaseObjectToCamelCase<
  Omit<HouseholdsInvitationsDbType, typeof tHouseMemCols.household_id>
>

export const mapToHouseholdsInvitationsApiType = (invitation: HouseholdsInvitationsDbType): HouseholdsInvitationsApiType =>
  apifyObject(invitation)
