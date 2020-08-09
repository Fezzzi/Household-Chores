import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { NotificationsBlock } from 'clientSrc/styles/blocks/notifications';
import * as NotificationTypes from 'clientSrc/constants/notificationTypes';
import * as NotificationActions from 'clientSrc/actions/notificationActions';

import { Notification } from './Notification';

const NotificationsComponent = ({ errors, warnings, messages, successes, removeNotification }) => {
  const mapNotifications = (notifications, type, key) => notifications && notifications.map((msg, id) => (
    <Notification
      type={type}
      message={msg}
      close={() => removeNotification({ key, id })}
      key={`error-${id}`}
    />
  ));

  return (
    <NotificationsBlock>
      {mapNotifications(errors, NotificationTypes.ERROR, 'errors')}
      {mapNotifications(warnings, NotificationTypes.WARNING, 'warnings')}
      {mapNotifications(messages, NotificationTypes.MESSAGE, 'messages')}
      {mapNotifications(successes, NotificationTypes.SUCCESS, 'successes')}
    </NotificationsBlock>
  );
};

NotificationsComponent.propTypes = ({
  errors: PropTypes.arrayOf(PropTypes.string),
  messages: PropTypes.arrayOf(PropTypes.string),
  warnings: PropTypes.arrayOf(PropTypes.string),
  successes: PropTypes.arrayOf(PropTypes.string),
  removeNotification: PropTypes.func,
});

const mapStateToProps = ({ notifications }) => notifications;

const mapDispatchToProps = dispatch => ({
  removeNotification: notification => dispatch(NotificationActions.removeNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
