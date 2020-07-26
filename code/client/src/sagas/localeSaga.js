import { put, takeEvery } from 'redux-saga/effects';
import * as LocaleActions from 'clientSrc/actions/localeActions';

function* handleLocaleChange({ payload: newLocale }) {
  try {
    yield put(LocaleActions.changeLocale(newLocale));
    localStorage.setItem('locale', newLocale);
  } catch (error) {
    console.error(error);
  }
}

export function* localeSaga() {
  yield takeEvery(LocaleActions.triggerLocaleChange.toString(), handleLocaleChange);
}
