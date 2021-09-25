import { AVAILABLE_MESSAGES, NOTIFICATION_TYPE } from './constants'

export type Notifications = {
  [type in NOTIFICATION_TYPE]: AVAILABLE_MESSAGES[]
}
