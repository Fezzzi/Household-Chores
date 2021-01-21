import { AUTH, COMMON, ERROR, FORM, HINT, HOUSEHOLD, INFO, SETTINGS, SUCCESS } from 'shared/constants/localeMessages'
import {
  USER_VISIBILITY_TYPE, SETTING_COLUMNS, SETTING_CATEGORIES, SETTING_TABS, HOUSEHOLD_TABS,
} from 'shared/constants'

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

  [COMMON.ARE_YOU_SURE]: 'Are you sure?',
  [COMMON.CANT_UNDO]: 'This action cannot be undone.',
  [COMMON.CANT_UNDO_SAVING]: 'You won\'t be able to undo this action after saving.',
  [COMMON.CONFIRM]: 'Confirm',
  [COMMON.CANCEL]: 'Cancel',
  [COMMON.DONT_ASK_AGAIN]: 'Don\'t ask again',
  [COMMON.HIDE]: 'Hide',
  [COMMON.ADD_MESSAGE]: 'Append message',
  [COMMON.MESSAGE]: 'Message',
  [COMMON.NO_CONTENT]: 'No content to display.',
  [COMMON.OR]: 'Or',
  [COMMON.SEARCH]: 'Search',
  [COMMON.SEARCHING]: 'Searching',
  [COMMON.SENDING]: 'Sending',
  [COMMON.SHOW]: 'Show',
  [COMMON.TERMS_AND_CONDITIONS]: 'Terms and Conditions',
  [COMMON.TIME_PREFIX]: '',
  [COMMON.TIME_SUFFIX]: 'ago',
  [COMMON.PHOTO_SIZE]: 'photo size',

  [ERROR.ADMIN_REQUIRED]: 'Every household must have at least one admin.',
  [ERROR.CONNECTION_ERROR]: 'Connection error, please try again later.',
  [ERROR.CONNECTION_REQUEST_ERROR]: 'Connection request failed, please try again later.',
  [ERROR.INVALID_REQUEST]: 'Invalid request.',
  [ERROR.ACTION_ERROR]: 'Requested action failed, please try again later.',
  [ERROR.BAD_PERMISSIONS]: 'Bad permissions.',
  [ERROR.EMAIL_USED]: 'An account with this email already exists.',
  [ERROR.GOOGLE_API_INIT_ERROR]: 'Google API initialization error.',
  [ERROR.IMAGE_INVALID]: 'Invalid photo, please verify that the file uploaded is an image with size under 1MB.',
  [ERROR.INCORRECT_PASS]: 'Incorrect password.',
  [ERROR.INVALID_DATA]: 'Invalid data.',
  [ERROR.INVALID_EMAIL]: 'Invalid email.',
  [ERROR.INVALID_FACEBOOK_DATA]: 'Invalid Facebook data.',
  [ERROR.INVALID_GOOGLE_DATA]: 'Invalid Google data.',
  [ERROR.UPLOADING_ERROR]: 'An error occurred during file uploading, please try again later.',
  [ERROR.LOG_IN_ERROR]: 'An error occurred during logging in, please try again later.',
  [ERROR.LOG_IN_MISSING_FIELDS]: 'Log in failed, missing one or more required fields.',
  [ERROR.NO_ACCOUNT]: 'No account with this email found.',
  [ERROR.RESET_PASS_ERROR]: 'An error occurred while send the link, please try again later.',
  [ERROR.SIGN_UP_ERROR]: 'An error occurred during signing up, please try again later.',
  [ERROR.SMTH_BROKE_LOGIN]: 'Something broke, please try to log in with different method.',
  [ERROR.VALUE_TOO_LONG]: 'Value is too long.',
  [ERROR.VALUE_TOO_SHORT]: 'Value is too short.',

  [INFO.NOTHING_TO_UPDATE]: 'Nothing to update.',

  [FORM.DELETE_ACCOUNT]: 'Delete account',
  [FORM.DROP_PHOTO_HERE]: 'Drop photo here',
  [FORM.CLICK_TO_UPLOAD]: 'Click to upload photo',
  [FORM.EMAIL]: 'Email',
  [FORM.LANGUAGE]: 'Language',
  [FORM.NEW_EMAIL]: 'New email',
  [FORM.NICKNAME]: 'Nickname',
  [FORM.NEW_NICKNAME]: 'New nickname',
  [FORM.NOTIFICATIONS]: 'Notifications',
  [FORM.CONNECTIONS]: 'Connections',
  [FORM.HOUSEHOLDS]: 'Households',
  [FORM.PASSWORD]: 'Password',
  [FORM.THEME]: 'Theme',
  [FORM.OLD_PASSWORD]: 'Old password',
  [FORM.NEW_PASSWORD]: 'New password',
  [FORM.USER_VISIBILITY]: 'Visibility',
  [FORM.CHANGE_PASSWORD]: 'Change password',
  [FORM.NO_HOUSEHOLD_REQUESTS]: 'You have no household invitations.',
  [FORM.NO_BLOCKED_CONNECTIONS]: 'You have no blocked users.',
  [FORM.NO_CONNECTION_REQUESTS]: 'You have no connection requests.',
  [FORM.NO_CONNECTIONS]: 'You have no connections.',
  [FORM.NO_DATA]: 'No data found.',
  [FORM.NO_CONNECTIONS_FOUND]: 'No users found.',
  [FORM.SELECT_PHOTO]: 'Upload or drop photo',
  [FORM.SAVE]: 'Save',
  [FORM.SAVING]: 'Saving',
  [FORM.APPROVE]: 'Approve',
  [FORM.BLOCK]: 'Block',
  [FORM.UNBLOCK]: 'Unblock',
  [FORM.CONNECT]: 'Connect',
  [FORM.IGNORE]: 'Ignore',
  [FORM.REMOVE]: 'Remove',
  [FORM.CONNECTION_SENT]: 'Request sent',
  [FORM.PENDING_CONNECTIONS]: 'Connection requests',
  [FORM.MY_CONNECTIONS]: 'My connections',
  [FORM.FIND_CONNECTION]: 'Find connections',
  [FORM.BLOCKED_CONNECTIONS]: 'Blocked users',
  [FORM.HOUSEHOLD_INVITATIONS]: 'Household invitations',
  [FORM.MUTUAL_FRIENDS]: 'Mutual friends',
  [FORM.EMAIL_NOTIFICATIONS]: 'Email notifications',
  [FORM.BROWSER_NOTIFICATIONS]: 'Browser notifications',
  [FORM.MOBILE_NOTIFICATIONS]: 'Mobile notifications',
  [FORM.CONNECTION_APPROVAL]: 'Request approval',
  [FORM.CONNECTION_REQUEST]: 'New request',
  [FORM.HOUSEHOLD_DELETING]: 'Household deletion',
  [FORM.HOUSEHOLD_EXPELLING]: 'Member expelling form household',
  [FORM.HOUSEHOLD_INVITATION]: 'New household invitation',
  [FORM.HOUSEHOLD_JOINING]: 'Member joining household',
  [FORM.HOUSEHOLD_LEAVING]: 'Member leaving household',
  [FORM[USER_VISIBILITY_TYPE.FOF]]: 'friends of friends',
  [FORM[USER_VISIBILITY_TYPE.ALL]]: 'all',

  [HINT.VISIBILITY]: 'Controls who will be able to find Your account and send connection request.',

  [HOUSEHOLD.LEAVE]: 'Leave household',
  [HOUSEHOLD.LEAVING]: 'Leaving',
  [HOUSEHOLD.DELETE]: 'Delete household',
  [HOUSEHOLD.DELETING]: 'Deleting',
  [HOUSEHOLD.CREATE]: 'Create household',
  [HOUSEHOLD.CREATING]: 'Creating',
  [HOUSEHOLD.MEMBER]: 'member',
  [HOUSEHOLD.MEMBERS]: 'members',
  [HOUSEHOLD.MEMBERS_SECTION]: 'members',
  [HOUSEHOLD.CHANGE_ROLE]: 'Change role',
  [HOUSEHOLD.REMOVE_USER]: 'Remove user',
  [HOUSEHOLD.CANCEL_REMOVE_USER]: 'Cancel removal',
  [HOUSEHOLD.INVITATIONS]: 'invitations',
  [HOUSEHOLD.INVITE_USERS]: 'invite users',
  [HOUSEHOLD.INVITE]: 'invite',
  [HOUSEHOLD.SINCE]: 'since',
  [HOUSEHOLD.MODULES]: 'modules',
  [HOUSEHOLD.ADD_MODULES]: 'add modules',

  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.PROFILE}`]]: 'Profile',
  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.CONNECTIONS}`]]: 'Connections',
  [SETTINGS[`${SETTING_COLUMNS.CATEGORY}_${SETTING_CATEGORIES.HOUSEHOLDS}`]]: 'Households',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.GENERAL}`]]: 'General',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.NOTIFICATIONS}`]]: 'Notifications',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.MY_CONNECTIONS}`]]: 'My connections',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.PENDING}`]]: 'Requests',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.BLOCKED}`]]: 'Blocked',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.FIND_CONNECTION}`]]: 'Find connection',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.NEW_HOUSEHOLD}`]]: 'Create household',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS.INVITATIONS}`]]: 'Invitations',
  [SETTINGS[`${SETTING_COLUMNS.TAB}_${HOUSEHOLD_TABS._HOUSEHOLD}`]]: 'Household',

  [SUCCESS.RESET_LINK]: 'A reset link has been sent to your email address.',
  [SUCCESS.SETTINGS_UPDATED]: 'Settings have been successfully updated.',
  [SUCCESS.ACCOUNT_CREATED]: 'Your account has been successfully created.',
}
