import { AUTH, COMMON, ERROR, FORM, SETTINGS, SUCCESS } from 'shared/constants/localeMessages';
import * as SettingTypes from 'shared/constants/settingTypes';

export default {
  [AUTH.BACK_TO_LOGIN]: 'Back to Login',
  [AUTH.CREATE_ACCOUNT]: 'Create New Account',
  [AUTH.DONT_HAVE_ACCOUNT]: 'Don\'t have an account?',
  [AUTH.ENTER_EMAIL_QUOTE]: 'Enter Your email address and we\'ll send You a link to reset Your password.',
  [AUTH.FORGOT_PASS]: 'Forgot Your Password?',
  [AUTH.HAVE_ACCOUNT]: 'Have an account?',
  [AUTH.LOADING_DOTS]: 'Loading...',
  [AUTH.LOG_IN]: 'Log In',
  [AUTH.LOG_IN_FACEBOOK]: 'Log in with Facebook',
  [AUTH.LOG_IN_GOOGLE]: 'Log in with Google',
  [AUTH.SEND_RESET_LINK]: 'Send Reset Link',
  [AUTH.SIGN_UP]: 'Sign Up',
  [AUTH.TERMS_AGREEMENT]: 'By signing up, You agree to our ',

  [COMMON.HIDE]: 'Hide',
  [COMMON.OR]: 'Or',
  [COMMON.SENDING]: 'Sending',
  [COMMON.SHOW]: 'Show',
  [COMMON.TERMS_AND_CONDITIONS]: 'Terms and Conditions',

  [ERROR.CONNECTION_ERROR]: 'Connection error, please try again later.',
  [ERROR.GOOGLE_API_INIT_ERROR]: 'Google API initialization error.',
  [ERROR.INCORRECT_PASS]: 'Incorrect password.',
  [ERROR.INVALID_DATA]: 'Invalid data.',
  [ERROR.INVALID_FACEBOOK_DATA]: 'Invalid Facebook data',
  [ERROR.INVALID_GOOGLE_DATA]: 'Invalid Google data.',
  [ERROR.LOG_IN_ERROR]: 'An error occurred during logging in, please try again later.',
  [ERROR.LOG_IN_MISSING_FIELDS]: 'Log in failed, missing one or more required fields.',
  [ERROR.NO_ACCOUNT]: 'No account with this email found.',
  [ERROR.RESET_PASS_ERROR]: 'An error occurred while send the link, please try again later.',
  [ERROR.SIGN_UP_ERROR]: 'An error occurred during signing up, please try again later.',
  [ERROR.SMTHG_BROKE_LOGIN]: 'Something broke, please try to log in with different method.',

  [FORM.EMAIL]: 'Email',
  [FORM.NICKNAME]: 'Nickname',
  [FORM.PASSWORD]: 'Password',

  [SETTINGS[`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.PROFILE}`]]: 'Profile',
  [SETTINGS[`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.GROUPS}`]]: 'Groups',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.GENERAL}`]]: 'General',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.NOTIFICATIONS}`]]: 'Notifications',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.CONNECTIONS}`]]: 'Connections',

  [SUCCESS.RESET_LINK]: 'A reset link has been sent to your email address.',
};
