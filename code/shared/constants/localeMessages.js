import * as SettingTypes from 'shared/constants/settingTypes';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';

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
  TERMS_AGREEMENT: 'auth.termsAgreement',
};

export const COMMON = {
  OR: 'common.or',
  SHOW: 'common.show',
  HIDE: 'common.hide',
  MESSAGE: 'common.message',
  ADD_MESSAGE: 'common.addMessage',
  SENDING: 'common.sending',
  SEARCH: 'common.search',
  SEARCHING: 'common.searching',
  TERMS_AND_CONDITIONS: 'common.termsAndConditions',
};

export const ERROR = {
  CONNECTION_ERROR: 'error.connectionError',
  GOOGLE_API_INIT_ERROR: 'error.googleAPIInitError',
  IMAGE_INVALID: 'error.imageInvalid',
  INCORRECT_PASS: 'error.incorrectPass',
  INVALID_DATA: 'error.invalidData',
  INVALID_EMAIL: 'error.invalidEmail',
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
};

export const FORM = {
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
  HOUSEHOLDS: 'form.households',
  EMAIL_NOTIFICATIONS: 'form.emailNotifications',
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
  CONNECTION_APPROVE: 'form.approve',
  CONNECTION_BLOCK: 'form.connectionBlock',
  CONNECTION_UNBLOCK: 'form.connectionUnblock',
  CONNECTION_CONNECT: 'form.connectionConnect',
  CONNECTION_IGNORE: 'form.connectionIgnore',
  CONNECTION_REMOVE: 'form.connectionRemove',
  CONNECTION_SENT: 'form.connectionSent',
  PENDING_CONNECTIONS: 'form.pendingConnections',
  BLOCKED_CONNECTIONS: 'form.blockedConnections',
  HOUSEHOLD_INVITATIONS: 'form.householdInvitations',

  [USER_VISIBILITY_TYPE.FOF]: 'form.userVisibilityFOF',
  [USER_VISIBILITY_TYPE.ALL]: 'form.userVisibilityALL',
};

export const HOUSEHOLD = {
  LEAVE: 'household.leave',
  DELETE: 'household.delete',
  CREATE: 'household.create',
  MEMBER: 'household.member',
  MEMBERS: 'household.members',
  MEMBERS_SECTION: 'household.membersSection',
  CHANGE_ROLE: 'household.changeRole',
  REMOVE_USER: 'household.removeUser',
  INVITATIONS: 'household.invitations',
  INVITE_USERS: 'household.inviteUser',
  INVITE: 'household.invite',
  MODULES: 'household.modules',
  ADD_MODULES: 'household.addModule',
};

export const SETTINGS = {
  [`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.PROFILE}`]: 'settings.categoryProfile',
  [`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.CONNECTIONS}`]: 'settings.categoryConnections',
  [`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.HOUSEHOLDS}`]: 'settings.categoryHouseholds',

  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.GENERAL}`]: 'settings.tabGeneral',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.NOTIFICATIONS}`]: 'settings.tabNotifications',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.MY_CONNECTIONS}`]: 'settings.tabMyConnections',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.PENDING}`]: 'settings.tabPending',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.BLOCKED}`]: 'settings.tabBlocked',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.FIND_CONNECTION}`]: 'settings.tabFindConnection',

  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.NEW_HOUSEHOLD}`]: 'settings.newHousehold',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.INVITATIONS}`]: 'settings.invitations',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS._HOUSEHOLD}`]: 'settings.household',
};

export const SUCCESS = {
  RESET_LINK: 'success.resetLink',
};
