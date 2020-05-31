import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import * as NotificationTypes from 'clientSrc/constants/notificationTypes';
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper, NotificationContent,
  NotificationClose, NotificationMessage,
} from 'clientSrc/styles/blocks/notifications';

import CloseIcon from '~/static/icons/notification-close-icon.svgr';
import ErrorIcon from '~/static/icons/notification-error-icon.svgr';
import MessageIcon from '~/static/icons/notification-error-icon.svgr';
import SuccessIcon from '~/static/icons/notification-error-icon.svgr';

const getNotificationIcon = type => {
  switch (type) {
    case NotificationTypes.MESSAGE: return <MessageIcon />;
    case NotificationTypes.SUCCESS: return <SuccessIcon />;
    case NotificationTypes.WARNING: return <ErrorIcon />;
    default: return <ErrorIcon />
  }
}

export class Notification extends Component {  
  render() {
    const { type, message, close } = this.props;
    setTimeout(close, 4000)
    
    return (
      <NotificationWrapper>
        <NotificationIconBlock>
          <NotificationIconWrapper iconColor={type}>
            {getNotificationIcon(type)}
          </NotificationIconWrapper>
        </NotificationIconBlock>
        <NotificationContent>
          <NotificationMessage>
            <span>
              {message}
            </span>
          </NotificationMessage>
        </NotificationContent>
        <NotificationClose onClick={close}>
          <CloseIcon />
        </NotificationClose>
      </NotificationWrapper>
    );
  }
}

Notification.propTypes = ({
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
});
