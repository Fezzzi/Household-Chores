import { AVAILABLE_MESSAGES, NOTIFICATION_TYPE, USER_VISIBILITY_TYPE } from './constants'

export type Notifications = {
  [type in NOTIFICATION_TYPE]: AVAILABLE_MESSAGES[]
}

export interface Activity {
  id: number
  message: AVAILABLE_MESSAGES
  messageTexts: string[]
  messagePhotos: string[]
  link: string | null
  dateCreated: string // Date
  dateSeen: string | null // Date | null
}

export interface User {
  userId: number
  email: string
  nickname: string
  photo: string
  visibility: USER_VISIBILITY_TYPE
  locale: string
}
