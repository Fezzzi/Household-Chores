import { createReducer } from '@reduxjs/toolkit';

import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from 'shared/constants/locale';
import { LOCALE_KEY } from 'clientSrc/constants/common';
import * as LocaleActions from 'clientSrc/actions/localeActions';
import applicationTexts from '~/code/client/locales';

const storageLocale = localStorage.getItem(LOCALE_KEY);

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
