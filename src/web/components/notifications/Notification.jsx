import React from 'react'
import { PropTypes } from 'prop-types'

import { NOTIFICATION_TYPE } from 'shared/constants'

import { COLORS } from '../../constants'
import { CloseIcon, NotificationIcon } from '../../styles/icons'
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper,
  NotificationContent, NotificationClose, NotificationMessage,
} from '../../styles/blocks/notifications'
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
          <NotificationIcon />
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
        <CloseIcon />
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
