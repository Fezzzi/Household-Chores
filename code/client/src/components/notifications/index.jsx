import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as NotificationTypes from 'shared/constants/notificationTypes'
import { NotificationsBlock } from 'clientSrc/styles/blocks/notifications'
import * as NotificationActions from 'clientSrc/actions/notificationActions'

import Notification from './Notification'

const Notifications = () => {
  const { errors, warnings, messages, successes } = useSelector(({ notifications }) => notifications)
  const dispatch = useDispatch()
  const removeNotification = useCallback(notification =>
    dispatch(NotificationActions.removeNotification(notification)),
  [dispatch])

  const mapNotifications = (notifications, type) => notifications && notifications.map((msg, id) => (
    <Notification
      type={type}
      message={msg}
      close={() => removeNotification({ type, id })}
      key={`${type}-${id}`}
    />
  ))

  return (
    <NotificationsBlock>
      {mapNotifications(errors, NotificationTypes.ERRORS)}
      {mapNotifications(warnings, NotificationTypes.WARNINGS)}
      {mapNotifications(messages, NotificationTypes.MESSAGES)}
      {mapNotifications(successes, NotificationTypes.SUCCESSES)}
    </NotificationsBlock>
  )
}

export default Notifications
