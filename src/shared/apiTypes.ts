import { AVAILABLE_MESSAGES, NOTIFICATION_TYPE } from './constants'

export type Notifications = {
  [type in NOTIFICATION_TYPE]: AVAILABLE_MESSAGES[]
}

export interface Activity {
  message: AVAILABLE_MESSAGES
  messageTexts: string[]
  messagePhotos: string[]
  link: string | null
  dateCreated: Date
  dateSeen: Date | null
}
