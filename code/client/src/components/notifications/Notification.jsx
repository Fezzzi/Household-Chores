import React from 'react'
import { PropTypes } from 'prop-types'
import { Close, ErrorOutline } from '@material-ui/icons'

import * as NotificationTypes from 'shared/constants/notificationTypes'
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper,
  NotificationContent, NotificationClose, NotificationMessage,
} from 'clientSrc/styles/blocks/notifications'

import LocaleText from '../common/LocaleText'

const getNotificationColor = type => {
  switch (type) {
    case NotificationTypes.SUCCESSES: return 'var(--cSuccess)'
    case NotificationTypes.MESSAGES: return 'var(--cMessage)'
    case NotificationTypes.WARNINGS: return 'var(--cWarning)'
    default: return 'var(--cError)'
  }
}

export const Notification = ({ type, message, close }) => {
  setTimeout(close, 4000)

  return (
    <NotificationWrapper>
      <NotificationIconBlock>
        <NotificationIconWrapper iconColor={getNotificationColor(type)}>
          <ErrorOutline />
        </NotificationIconWrapper>
      </NotificationIconBlock>
      <NotificationContent>
        <NotificationMessage>
          <span>
            <LocaleText message={message} />
          </span>
        </NotificationMessage>
      </NotificationContent>
      <NotificationClose onClick={close}>
        <Close />
      </NotificationClose>
    </NotificationWrapper>
  )
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}
