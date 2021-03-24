enum NOTIFICATIONS {
  CONNECTION_REQUEST = 'connection_request',
  CONNECTION_APPROVAL = 'connection_approval',
  HOUSEHOLD_INVITATION = 'household_invitation',
  HOUSEHOLD_JOINING = 'household_joining',
  HOUSEHOLD_LEAVING = 'household_leaving',
  HOUSEHOLD_DELETING = 'household_deleting',
  HOUSEHOLD_EXPELLING = 'household_expelling',
}

const NOTIFICATION_EMAILS: Record<NOTIFICATIONS, string> = {
  [NOTIFICATIONS.CONNECTION_REQUEST]: '',
  [NOTIFICATIONS.CONNECTION_APPROVAL]: '',
  [NOTIFICATIONS.HOUSEHOLD_INVITATION]: '',
  [NOTIFICATIONS.HOUSEHOLD_JOINING]: '',
  [NOTIFICATIONS.HOUSEHOLD_LEAVING]: '',
  [NOTIFICATIONS.HOUSEHOLD_DELETING]: '',
  [NOTIFICATIONS.HOUSEHOLD_EXPELLING]: '',
}

export { NOTIFICATIONS, NOTIFICATION_EMAILS }