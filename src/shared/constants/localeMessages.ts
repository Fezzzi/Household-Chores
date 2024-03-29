import {
  SETTING_COLUMNS, CONNECTION_TABS, PROFILE_TABS, HOUSEHOLD_TABS, SETTING_CATEGORIES, MORE_TABS,
} from './settings'
import { USER_VISIBILITY_TYPE } from './userVisibilityType'

export const ACTIVITY = {
  CONNECTION_REQUEST: 'activity.connectionRequest',
  CONNECTION_APPROVAL: 'activity.connectionApproval',
  HOUSEHOLD_INVITATION: 'activity.householdInvitation',
  HOUSEHOLD_JOIN: 'activity.householdJoin',
  HOUSEHOLD_LEAVE: 'activity.householdLeave',
  HOUSEHOLD_REMOVAL: 'activity.householdRemoval',
  HOUSEHOLD_REMOVAL_MULTIPLE: 'activity.householdRemovalMultiple',
  HOUSEHOLD_EXPELLING: 'activity.householdExpelling',
  HOUSEHOLD_DELETE: 'activity.householdDelete',
} as const

export const AUTH = {
  BACK_TO_LOGIN: 'auth.backToLogin',
  CREATE_ACCOUNT: 'auth.createAccount',
  DONT_HAVE_ACCOUNT: 'auth.dontHaveAccount',
  ENTER_EMAIL_QUOTE: 'auth.enterEmailQuote',
  FORGOT_PASS: 'auth.forgotPass',
  HAVE_ACCOUNT: 'auth.haveAccount',
  LOADING_DOTS: 'auth.loadingDots',
  LOG_IN: 'auth.logIn',
  LOG_IN_FACEBOOK: 'auth.logInFacebook',
  LOG_IN_GOOGLE: 'auth.logInGoogle',
  SEND_RESET_LINK: 'auth.sendResetLink',
  SIGN_UP: 'auth.signUp',
  SIGN_OUT: 'auth.signOut',
  TERMS_AGREEMENT: 'auth.termsAgreement',
} as const

export const COMMON = {
  AND_X_MORE: 'common.andXMore',
  ARE_YOU_SURE: 'common.areYouSure',
  CANT_UNDO: 'common.cantUndo',
  CANT_UNDO_SAVING: 'common.cantUndoSaving',
  CONTRIBUTORS: 'common.contributors',
  CONFIRM: 'common.confirm',
  CONTINUE: 'common.continue',
  FINISH: 'common.finish',
  BACK: 'common.back',
  CANCEL: 'common.cancel',
  DONT_ASK_AGAIN: 'common.dontAskAgain',
  OR: 'common.or',
  SHOW: 'common.show',
  HIDE: 'common.hide',
  MESSAGE: 'common.message',
  ADD_MESSAGE: 'common.addMessage',
  NO_CONTENT: 'common.noContent',
  SENDING: 'common.sending',
  SEARCH: 'common.search',
  SEARCHING: 'common.searching',
  TERMS_AND_CONDITIONS: 'common.termsAndConditions',
  TIME_PREFIX: 'common.timePrefix',
  TIME_SUFFIX: 'common.timeSuffix',
  PHOTO_SIZE: 'common.photoSize',
} as const

// Time in instrumental case (to be used like e.g. 5 minutes ago)
export const TIME = {
  SECOND: 'time.second',
  SECONDS: 'time.seconds',
  MINUTE: 'time.minute',
  MINUTES: 'time.minutes',
  HOUR: 'time.hour',
  HOURS: 'time.hours',
  DAY: 'time.day',
  DAYS: 'time.days',
  WEEK: 'time.week',
  WEEKS: 'time.weeks',
  YEAR: 'time.year',
  YEARS: 'time.years',
  SECONDS_SHORT: 'time.secondsShort',
  MINUTES_SHORT: 'time.minutesShort',
  HOURS_SHORT: 'time.hoursShort',
  DAYS_SHORT: 'time.daysShort',
  WEEKS_SHORT: 'time.weeksShort',
  YEARS_SHORT: 'time.yearsShort',
}

export const ERROR = {
  ERROR: 'error.error',
  ADMIN_REQUIRED: 'error.adminRequired',
  CONNECTION_ERROR: 'error.connectionError',
  CONNECTION_REQUEST_ERROR: 'error.connectionRequestError',
  ACTION_ERROR: 'error.actionError',
  BAD_PERMISSIONS: 'error.badPermissions',
  INVALID_REQUEST: 'error.invalidRequest',
  GOOGLE_API_INIT_ERROR: 'error.googleAPIInitError',
  IMAGE_INVALID: 'error.imageInvalid',
  INCORRECT_PASS: 'error.incorrectPass',
  INVALID_DATA: 'error.invalidData',
  INVALID_EMAIL: 'error.invalidEmail',
  UPLOADING_ERROR: 'error.uploadingError',
  EMAIL_USED: 'error.emailUsed',
  INVALID_FACEBOOK_DATA: 'error.invalidFacebookData',
  INVALID_GOOGLE_DATA: 'error.invalidGoogleData',
  LOG_IN_ERROR: 'error.logInError',
  LOG_IN_MISSING_FIELDS: 'error.logInMissingFields',
  NO_ACCOUNT: 'error.noAccount',
  RESET_PASS_ERROR: 'error.resetPassError',
  SIGN_UP_ERROR: 'error.signUpError',
  SMTH_BROKE_LOGIN: 'error.smthBrokeLogIn',
  VALUE_TOO_SHORT: 'error.valueTooShort',
  VALUE_TOO_LONG: 'error.valueTooLong',
} as const

export const INFO = {
  NOTHING_TO_UPDATE: 'info.nothingToUpdate',
} as const

export const FORM = {
  DELETE_ACCOUNT: 'form.deleteAccount',
  DROP_PHOTO_HERE: 'form.dropPhotoHere',
  CLICK_TO_UPLOAD: 'form.clickToUpload',
  CONNECTIONS: 'form.connections',
  EMAIL: 'form.email',
  LANGUAGE: 'form.language',
  NEW_EMAIL: 'form.newEmail',
  NICKNAME: 'form.nickname',
  NEW_NICKNAME: 'form.newNickname',
  USER_VISIBILITY: 'form.userVisibility',
  NOTIFICATIONS: 'form.notifications',
  CONFIRMATION_DIALOGS: 'form.confirmationDialogs',
  DIALOGS: 'form.dialogs',
  TUTORIAL_DIALOG: 'form.tutorialDialogs',
  HOUSEHOLDS: 'form.households',
  PASSWORD: 'form.password',
  THEME: 'form.theme',
  OLD_PASSWORD: 'form.oldPassword',
  NEW_PASSWORD: 'form.newPassword',
  CHANGE_PASSWORD: 'form.changePassword',
  SELECT_PHOTO: 'form.selectPhoto',
  SAVE: 'form.save',
  SAVING: 'form.saving',
  NO_DATA: 'form.noData',
  NO_HOUSEHOLD_REQUESTS: 'form.noHouseholdRequests',
  NO_BLOCKED_CONNECTIONS: 'form.noBLockedConnections',
  NO_CONNECTION_REQUESTS: 'form.noConnectionRequests',
  NO_CONNECTIONS: 'form.noConnections',
  NO_CONNECTIONS_FOUND: 'form.noConnectionsFound',
  APPROVE: 'form.approve',
  BLOCK: 'form.block',
  UNBLOCK: 'form.unblock',
  CONNECT: 'form.connect',
  IGNORE: 'form.ignore',
  REMOVE: 'form.connectionRemove',
  CONNECTION_SENT: 'form.connectionSent',
  MY_CONNECTIONS: 'form.myConnections',
  FIND_CONNECTION: 'form.findConnection',
  PENDING_CONNECTIONS: 'form.pendingConnections',
  BLOCKED_CONNECTIONS: 'form.blockedConnections',
  HOUSEHOLD_INVITATIONS: 'form.householdInvitations',
  MUTUAL_FRIENDS: 'form.mutualFriends',
  SET_ALIAS: 'form.setAlias',

  EMAIL_NOTIFICATIONS: 'form.emailNotifications',
  MOBILE_NOTIFICATIONS: 'form.mobileNotifications',
  CONNECTION_APPROVAL: 'form.connectionApproval',
  CONNECTION_REQUEST: 'form.connectionRequest',
  HOUSEHOLD_DELETING: 'form.householdDeleting',
  HOUSEHOLD_EXPELLING: 'form.householdExpelling',
  HOUSEHOLD_INVITATION: 'form.householdInvitation',
  HOUSEHOLD_JOINING: 'form.householdJoining',
  HOUSEHOLD_LEAVING: 'form.householdLeaving',

  [USER_VISIBILITY_TYPE.FOF]: 'form.userVisibilityFOF',
  [USER_VISIBILITY_TYPE.ALL]: 'form.userVisibilityALL',

  HOUSEHOLD_USER_DELETING_DIALOG: 'form.householdMemberDeleting',
} as const

export const HINT = {
  VISIBILITY: 'hint.visibility',
} as const

export const HOME = {
  NO_HOUSEHOLD: 'home.noHousehold',
  NO_MORE_FEED: 'home.noMoreFeed',
} as const

export const MORE = {
  ABOUT_THE_APPLICATION: 'more.aboutTheApplication',
  TEAM: 'more.team',
  CONTRIBUTORS: 'more.contributors',
  SUPPORTERS: 'more.supporters',
  FEZZI: 'more.fezzi',
  ABOUT_TEXT: 'more.aboutText',
} as const

export const HOUSEHOLD = {
  LEAVE: 'household.leave',
  LEAVING: 'household.leaving',
  DELETE: 'household.delete',
  DELETING: 'household.deleting',
  CREATE: 'household.create',
  CREATING: 'household.creating',
  MEMBER: 'household.member',
  MEMBERS: 'household.members',
  MEMBERS_SECTION: 'household.membersSection',
  CHANGE_ROLE: 'household.changeRole',
  REMOVE_USER: 'household.removeUser',
  CANCEL_REMOVE_USER: 'household.cancelRemoveUser',
  INVITATIONS: 'household.invitations',
  INVITE_USERS: 'household.inviteUser',
  SINCE: 'household.since',
  MODULES: 'household.modules',
  ADD_MODULES: 'household.addModule',
} as const

export const SETTINGS = {
  [`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.PROFILE}`]: 'settings.categoryProfile',
  [`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.CONNECTIONS}`]: 'settings.categoryConnections',
  [`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.HOUSEHOLDS}`]: 'settings.categoryHouseholds',
  [`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.MORE}`]: 'settings.categoryMore',

  [`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.GENERAL}`]: 'settings.tabGeneral',
  [`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.NOTIFICATIONS}`]: 'settings.tabNotifications',
  [`${SETTING_COLUMNS.TAB}_${PROFILE_TABS.DIALOGS}`]: 'settings.tabDialogs',

  [`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.MY_CONNECTIONS}`]: 'settings.tabMyConnections',
  [`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.PENDING}`]: 'settings.tabPending',
  [`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.BLOCKED}`]: 'settings.tabBlocked',
  [`${SETTING_COLUMNS.TAB}_${CONNECTION_TABS.FIND_CONNECTION}`]: 'settings.tabFindConnection',

  [`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.NEW_HOUSEHOLD}`]: 'settings.newHousehold',
  [`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.INVITATIONS}`]: 'settings.invitations',
  [`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS._HOUSEHOLD}`]: 'settings.household',

  [`${SETTING_COLUMNS.TAB}_${MORE_TABS.ABOUT}`]: 'settings.about',
  [`${SETTING_COLUMNS.TAB}_${MORE_TABS.SUPPORT}`]: 'settings.support',
  [`${SETTING_COLUMNS.TAB}_${MORE_TABS.CONTRIBUTE}`]: 'settings.contribute',
}

export const SUCCESS = {
  RESET_LINK: 'success.resetLink',
  SETTINGS_UPDATED: 'success.settingsUpdated',
  ACCOUNT_CREATED: 'success.accountCreated',
  ACCOUNT_PAIRED: 'success.accountPaired',
  CONNECTION_REQUEST_SENT: 'success.connectionRequestSent',
  SIGNED_OUT: 'success.loggedOut',
} as const
