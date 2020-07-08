import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { NotificationsBlock } from 'clientSrc/styles/blocks/notifications';
import * as NotificationTypes from 'clientSrc/constants/notificationTypes';
import * as RootActions from 'clientSrc/actions/rootActions';

import { Notification } from './Notification';

export const NotificationsComponent = props => {
  const { errors, warnings, messages, successes, removeNotification } = props;

  const mapNotifications = (notifications, type, key) => notifications.map((msg, id) => (
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

const mapStateToProps = ({ app: { notifications } }) => notifications;

const mapDispatchToProps = dispatch => ({
  removeNotification: notification => dispatch(RootActions.removeNotification(notification)),
});

export const Notifications = connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);
