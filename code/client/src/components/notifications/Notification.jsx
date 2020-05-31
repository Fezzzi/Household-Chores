import React from 'react';
import { PropTypes } from 'prop-types';

import * as NotificationTypes from 'clientSrc/constants/notificationTypes';
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper, NotificationContent,
  NotificationClose, NotificationMessage,
} from 'clientSrc/styles/blocks/notifications';

import CloseIcon from '~/static/icons/notification-close-icon.svgr';
import ErrorIcon from '~/static/icons/notification-error-icon.svgr';
import SuccessIcon from '~/static/icons/notification-success-icon.svgr';

export const Notification = ({ type, message, close }) => {
  setTimeout(close, 4000);

  return (
    <NotificationWrapper>
      <NotificationIconBlock>
        <NotificationIconWrapper iconColor={type}>
          {type === NotificationTypes.SUCCESS
            ? <SuccessIcon />
            : <ErrorIcon />}
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
};

Notification.propTypes = ({
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
});
