import { RequestImage, RequestRawImage } from '../types'

export interface CreateHouseholdInputs {
  name: string
  photo: RequestRawImage
  userNickname: string
  userPhoto: RequestRawImage
}

export interface CreateHouseholdInvitation {
  toId: number
  message: string
}

export interface CreateHouseholdRequest {
  inputs: CreateHouseholdInputs
  invitations: CreateHouseholdInvitation[]
}

export interface DeleteHouseholdRequest {
  householdId: number
}

export interface IgnoreInvitationRequest {
  householdId: number
  fromId: number
}

export interface ApproveInvitationRequest {
  fromId: number
  householdId: number
  userNickname: string
  userPhoto: RequestImage
}
