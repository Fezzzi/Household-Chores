import { HOUSEHOLD_ROLE_TYPE, USER_VISIBILITY_TYPE } from 'shared/constants'
import { NotifySettingsUnforcedApiType, UserDialogsUnforcedApiType } from 'serverSrc/database/mappers'

import { RequestImage, RequestRawImage } from '../types'

export interface HouseholdNewInvitation {
  userId: number
  message: string
}

export interface HouseholdChangedRole {
  userId: number
  role: string
}

export interface HouseholdEditInputs {
  householdId: number
  name?: string
  photo?: RequestRawImage
  userNickname?: string
  userPhoto?: RequestRawImage
  userRole?: typeof HOUSEHOLD_ROLE_TYPE.MEMBER | typeof HOUSEHOLD_ROLE_TYPE.MANAGER | typeof HOUSEHOLD_ROLE_TYPE.ADMIN
  newInvitations: HouseholdNewInvitation[]
  changedRoles: HouseholdChangedRole[]
  removedMembers: number[]
  removedInvitations: number[]
}

export interface GeneralEditInputs {
  nickname?: string
  email?: string
  oldPassword?: string
  newPassword?: string
  photo?: RequestImage
  visibility?: typeof USER_VISIBILITY_TYPE.FOF | typeof USER_VISIBILITY_TYPE.ALL
}

export type SettingsUpdateRequestInputs = HouseholdEditInputs | GeneralEditInputs
  | UserDialogsUnforcedApiType | NotifySettingsUnforcedApiType
