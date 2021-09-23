export const tNotifySettingsName = 'notification_settings'
export const tNotifySettingsCols = {
  user_id: 'user_id',
  email_notifications: 'email_notifications',
  mobile_notifications: 'mobile_notifications',

  connection_request: 'connection_request',
  connection_approval: 'connection_approval',

  household_invitation: 'household_invitation',
  household_joining: 'household_joining',
  household_leaving: 'household_leaving',
  household_deleting: 'household_deleting',
  household_expelling: 'household_expelling',
} as const

export interface TNotifySettingsType {
  [tNotifySettingsCols.user_id]: number
  [tNotifySettingsCols.email_notifications]: boolean
  [tNotifySettingsCols.mobile_notifications]: boolean
  [tNotifySettingsCols.connection_request]: boolean
  [tNotifySettingsCols.connection_approval]: boolean
  [tNotifySettingsCols.household_invitation]: boolean
  [tNotifySettingsCols.household_joining]: boolean
  [tNotifySettingsCols.household_leaving]: boolean
  [tNotifySettingsCols.household_deleting]: boolean
  [tNotifySettingsCols.household_expelling]: boolean
}
