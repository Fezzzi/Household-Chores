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
  name: string
  photo: RequestRawImage
  userNickname: string
  userPhoto: RequestRawImage
  userRole: string
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
  visibility?: string
}

export type DialogEditInputs = Record<string, boolean>
export type NotificationEditInputs = Record<string, boolean>
export type SettingsUpdateRequestInputs = HouseholdEditInputs | GeneralEditInputs | DialogEditInputs | NotificationEditInputs
