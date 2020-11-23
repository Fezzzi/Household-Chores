import { put, takeEvery } from 'redux-saga/effects';

import * as LocaleActions from 'clientSrc/actions/localeActions';
import { LOCALE_KEY } from 'clientSrc/constants/common';

function* handleLocaleChange({ payload: newLocale }) {
  try {
    yield put(LocaleActions.changeLocale(newLocale));
    localStorage.setItem(LOCALE_KEY, newLocale);
  } catch (error) {
    console.error(error);
  }
}

export function* localeSaga() {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleLocaleChange);
}
