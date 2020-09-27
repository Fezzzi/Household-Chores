import React from 'react';
import { PropTypes } from 'prop-types';

import * as NotificationTypes from 'shared/constants/notificationTypes';
import {
  NotificationWrapper, NotificationIconBlock, NotificationIconWrapper,
  NotificationContent, NotificationClose, NotificationMessage,
} from 'clientSrc/styles/blocks/notifications';

import CloseIcon from '~/static/icons/notification-close-icon.svgr';
import ErrorIcon from '~/static/icons/notification-error-icon.svgr';
import SuccessIcon from '~/static/icons/notification-success-icon.svgr';

import LocaleText from '../common/LocaleText';

const getNotificationColor = type => {
  switch (type) {
    case NotificationTypes.SUCCESSES: return 'var(--cSuccess)';
    case NotificationTypes.MESSAGES: return 'var(--cMessage)';
    case NotificationTypes.WARNINGS: return 'var(--cWarning)';
    default: return 'var(--cError)';
  }
};

export const Notification = ({ type, message, close }) => {
  setTimeout(close, 4000);

  return (
    <NotificationWrapper>
      <NotificationIconBlock>
        <NotificationIconWrapper iconColor={getNotificationColor(type)}>
          {type === NotificationTypes.SUCCESSES
            ? <SuccessIcon />
            : <ErrorIcon />}
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
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
