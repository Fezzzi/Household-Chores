import { put, call } from 'redux-saga/effects'

import { NotificationActions } from 'clientSrc/actions'
import * as NotificationTypes from 'shared/constants/notificationTypes'

export function* handleResponse(response, onSuccess) {
  if (!response[NotificationTypes.ERRORS] || !response[NotificationTypes.ERRORS].length) {
    yield call(onSuccess, response)
  } else {
    yield put(NotificationActions.addNotifications({
      [NotificationTypes.ERRORS]: response[NotificationTypes.ERRORS],
    }))
  }
}
