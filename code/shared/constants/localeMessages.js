import * as SettingTypes from 'shared/constants/settingTypes';

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
  SENDING: 'common.sending',
  TERMS_AND_CONDITIONS: 'common.termsAndConditions',
};

export const ERROR = {
  CONNECTION_ERROR: 'error.connectionError',
  GOOGLE_API_INIT_ERROR: 'error.googleAPIInitError',
  IMAGE_INVALID: 'error.imageInvalid',
  INCORRECT_PASS: 'error.incorrectPass',
  INVALID_DATA: 'error.invalidData',
  INVALID_FACEBOOK_DATA: 'error.invalidFacebookData',
  INVALID_GOOGLE_DATA: 'error.invalidGoogleData',
  LOG_IN_ERROR: 'error.logInError',
  LOG_IN_MISSING_FIELDS: 'error.logInMissingFields',
  NO_ACCOUNT: 'error.noAccount',
  RESET_PASS_ERROR: 'error.resetPassError',
  SIGN_UP_ERROR: 'error.signUpError',
  SMTHG_BROKE_LOGIN: 'error.smthgBrokeLogIn',
};

export const FORM = {
  DROP_PHOTO_HERE: 'form.dropPhotoHere',
  EMAIL: 'form.email',
  LANGUAGE: 'form.language',
  NEW_EMAIL: 'form.newEmail',
  NICKNAME: 'form.nickname',
  NEW_NICKNAME: 'form.newNickname',
  NOTIFICATIONS: 'form.notifications',
  PASSWORD: 'form.password',
  THEME: 'form.theme',
  OLD_PASSWORD: 'form.oldPassword',
  NEW_PASSWORD: 'form.newPassword',
  SELECT_PHOTO: 'form.selectPhoto',
  SAVE: 'form.save',
};

export const SETTINGS = {
  [`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.PROFILE}`]: 'settings.categoryProfile',
  [`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.GROUPS}`]: 'settings.categoryGroups',

  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.GENERAL}`]: 'settings.tabGeneral',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.NOTIFICATIONS}`]: 'settings.tabNotifications',
  [`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.CONNECTIONS}`]: 'settings.tabConnections',
};

export const SUCCESS = {
  RESET_LINK: 'success.resetLink',
};
