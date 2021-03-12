import { RequestRawImage } from '../types'

export type SettingsUpdateRequestInputs = Record<string, string | number>

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
