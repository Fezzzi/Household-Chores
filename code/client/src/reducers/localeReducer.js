import { createReducer } from '@reduxjs/toolkit';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'clientSrc/constants/locale';
import applicationTexts from '~/code/client/locales';
import * as LocaleActions from 'clientSrc/actions/localeActions';

const storageLocale = localStorage.getItem('locale');

const initialState = {
  locale: storageLocale || DEFAULT_LOCALE,
  availableLocales: AVAILABLE_LOCALES,
  applicationTexts: applicationTexts[storageLocale || DEFAULT_LOCALE],
};

const changeLocale = (state, { payload: locale }) => ({
  ...state,
  locale,
  applicationTexts: applicationTexts[locale],
});

export default createReducer(initialState, {
  [LocaleActions.changeLocale.toString()]: changeLocale,
});
