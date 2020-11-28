import { put, call } from 'redux-saga/effects'

import { NotificationActions } from 'clientSrc/actions'
import { NOTIFICATION_TYPE } from 'shared/constants'

export function* handleResponse(response, onSuccess) {
  if (!response[NOTIFICATION_TYPE.ERRORS] || !response[NOTIFICATION_TYPE.ERRORS].length) {
    yield call(onSuccess, response)
  } else {
    yield put(NotificationActions.addNotifications({
      [NOTIFICATION_TYPE.ERRORS]: response[NOTIFICATION_TYPE.ERRORS],
    }))
  }
}
