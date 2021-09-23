import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NOTIFICATION_TYPE } from 'shared/constants'

import { NotificationsBlock } from '../../styles/blocks/notifications'
import { NotificationActions } from '../../actions'
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
      {mapNotifications(errors, NOTIFICATION_TYPE.ERRORS)}
      {mapNotifications(warnings, NOTIFICATION_TYPE.WARNINGS)}
      {mapNotifications(messages, NOTIFICATION_TYPE.MESSAGES)}
      {mapNotifications(successes, NOTIFICATION_TYPE.SUCCESSES)}
    </NotificationsBlock>
  )
}

export default Notifications
