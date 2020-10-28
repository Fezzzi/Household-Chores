import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as NotificationTypes from 'shared/constants/notificationTypes';
import { NotificationsBlock } from 'clientSrc/styles/blocks/notifications';
import * as NotificationActions from 'clientSrc/actions/notificationActions';

import { Notification } from './Notification';

const NotificationsComponent = ({ errors, warnings, messages, successes, removeNotification }) => {
  const mapNotifications = (notifications, type) => notifications && notifications.map((msg, id) => (
    <Notification
      type={type}
      message={msg}
      close={() => removeNotification({ type, id })}
      key={`${type}-${id}`}
    />
  ));

  return (
    <NotificationsBlock>
      {mapNotifications(errors, NotificationTypes.ERRORS)}
      {mapNotifications(warnings, NotificationTypes.WARNINGS)}
      {mapNotifications(messages, NotificationTypes.MESSAGES)}
      {mapNotifications(successes, NotificationTypes.SUCCESSES)}
    </NotificationsBlock>
  );
};

NotificationsComponent.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  messages: PropTypes.arrayOf(PropTypes.string),
  warnings: PropTypes.arrayOf(PropTypes.string),
  successes: PropTypes.arrayOf(PropTypes.string),
  removeNotification: PropTypes.func,
};

const mapStateToProps = ({ notifications }) => notifications;

const mapDispatchToProps = dispatch => ({
  removeNotification: notification => dispatch(NotificationActions.removeNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
