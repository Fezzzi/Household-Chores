import React from 'react'
import { PropTypes } from 'prop-types'
import { Close, ErrorOutline } from '@material-ui/icons'

import { NOTIFICATION_TYPE } from 'shared/constants'
import { COLORS } from 'clientSrc/constants'
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper,
  NotificationContent, NotificationClose, NotificationMessage,
} from 'clientSrc/styles/blocks/notifications'

import { LocaleText } from '../common'

const getNotificationColor = type => {
  switch (type) {
    case NOTIFICATION_TYPE.SUCCESSES: return COLORS.SUCCESS
    case NOTIFICATION_TYPE.MESSAGES: return COLORS.MESSAGE
    case NOTIFICATION_TYPE.WARNINGS: return COLORS.WARNING
    default: return COLORS.ERROR
  }
}

const Notification = ({ type, message, close }) => {
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

export default Notification
