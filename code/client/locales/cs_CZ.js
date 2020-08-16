import { AUTH, COMMON, ERROR, FORM, SETTINGS, SUCCESS } from 'shared/constants/localeMessages';
import * as SettingTypes from 'shared/constants/settingTypes';

export default {
  [AUTH.BACK_TO_LOGIN]: 'Zpět na přihlášení',
  [AUTH.CREATE_ACCOUNT]: 'Vytvořit nový účet',
  [AUTH.DONT_HAVE_ACCOUNT]: 'Nemáte účet?',
  [AUTH.ENTER_EMAIL_QUOTE]: 'Zadejte Vaši emailovou adresu a my Vám zašleme link pro obnovu Vašeho hesla.',
  [AUTH.FORGOT_PASS]: 'Zapomenuté heslo?',
  [AUTH.HAVE_ACCOUNT]: 'Máte účet?',
  [AUTH.LOADING_DOTS]: 'Načítání...',
  [AUTH.LOG_IN]: 'Přihlásit se',
  [AUTH.LOG_IN_FACEBOOK]: 'Příhlásit se s Facebook',
  [AUTH.LOG_IN_GOOGLE]: 'Přihlásit se s Google',
  [AUTH.SEND_RESET_LINK]: 'Odeslat link',
  [AUTH.SIGN_UP]: 'Zaregistrovat se',
  [AUTH.TERMS_AGREEMENT]: 'Registrací potvrzujete naše ',

  [COMMON.HIDE]: 'Skrýt',
  [COMMON.OR]: 'Nebo',
  [COMMON.SENDING]: 'Odesílání',
  [COMMON.SHOW]: 'Zobrazit',
  [COMMON.TERMS_AND_CONDITIONS]: 'podmínky použití',

  [ERROR.CONNECTION_ERROR]: 'Chyba spojení, zkuste to prosím později',
  [ERROR.GOOGLE_API_INIT_ERROR]: 'Chyba inicializace Google API.',
  [ERROR.INCORRECT_PASS]: 'Špatné heslo.',
  [ERROR.INVALID_DATA]: 'Chybná data.',
  [ERROR.INVALID_FACEBOOK_DATA]: 'Invalid Facebook data',
  [ERROR.INVALID_GOOGLE_DATA]: 'Invalid Google data.',
  [ERROR.LOG_IN_ERROR]: 'Během přihlašování došlo k chybě, zkuste to prosím později',
  [ERROR.LOG_IN_MISSING_FIELDS]: 'Přihlášení selhalo, chybí jedno nebo více povinných polí.',
  [ERROR.NO_ACCOUNT]: 'Účet s tímto emailem nebyl nalezen.',
  [ERROR.RESET_PASS_ERROR]: 'Během odesílání linku došlo k chybě, zkuste to prosím později',
  [ERROR.SIGN_UP_ERROR]: 'Během registrace došlo k chybě, zkuste to prosím později.',
  [ERROR.SMTHG_BROKE_LOGIN]: 'Něco se porouchalo, zkuste prosím jinou metodu přihlášení.',

  [FORM.EMAIL]: 'Email',
  [FORM.NICKNAME]: 'Jméno',
  [FORM.PASSWORD]: 'Heslo',
  [FORM.PHOTO]: 'Obrázek',

  [SETTINGS[`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.PROFILE}`]]: 'Profil',
  [SETTINGS[`${SettingTypes.COLUMNS.CATEGORY}_${SettingTypes.CATEGORIES.GROUPS}`]]: 'Skupiny',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.GENERAL}`]]: 'Obecné',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.NOTIFICATIONS}`]]: 'Notifikace',
  [SETTINGS[`${SettingTypes.COLUMNS.TAB}_${SettingTypes.TABS.CONNECTIONS}`]]: 'Spojení',

  [SUCCESS.RESET_LINK]: 'Link pro obnovu hesla byl úspěšně zaslán na Vaši emailovou adresu.',
};
