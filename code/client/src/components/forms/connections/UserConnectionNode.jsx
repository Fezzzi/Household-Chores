import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from '@material-ui/icons';

import { useConnectionButtons } from 'clientSrc/helpers/connectionButtons';
import {
  UserButtonsBox, UserName, UserNode, UserPhotoBox,
  UserPhoto, WrapperBox, AppendMessageAnchor, AppendMessageIcon,
} from 'clientSrc/styles/blocks/users';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { TABS } from 'shared/constants/settingTypes';

import { PrimaryButton } from '../index';
import { LocaleText } from '../../common';
import { InfoTooltip } from '../../portals';

const UserConnectionNode = ({ tab, user, setData, addNotification }) => {
  const [buttons, setButtons] = useState({});

  useEffect(() => setButtons(
    useConnectionButtons(tab, user, setData, setButtons, addNotification)
  ), [setData]);

  const { id, nickname, photo, state, message: userMessage } = user;
  return (
    <WrapperBox>
      <UserNode>
        <UserPhotoBox>
          <UserPhoto src={photo} />
          {(tab === TABS.FIND_CONNECTION || tab === TABS.PENDING) && state === CONNECTION_STATE_TYPE.WAITING && userMessage && (
            <AppendMessageAnchor>
              <InfoTooltip
                icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                text={userMessage}
              />
            </AppendMessageAnchor>
          )}
        </UserPhotoBox>
        <UserName>{nickname}</UserName>
        <UserButtonsBox>
          {Object.keys(buttons).map(label => {
            const {
              active, message: buttonMessage, color, background, backgroundHover, disabled, clickHandler,
            } = buttons[label];
            return active && (
              <PrimaryButton
                key={`${id}-${label}`}
                disabled={disabled}
                /* todo: Implement connection messages and pass it here */
                clickHandler={clickHandler('')}
                margin="0 0 6px"
                color={color}
                background={background}
                backgroundHover={backgroundHover}
              >
                <LocaleText message={buttonMessage || label} />
              </PrimaryButton>
            );
          })}
        </UserButtonsBox>
      </UserNode>
    </WrapperBox>
  );
};

UserConnectionNode.propTypes = {
  tab: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
    date_created: PropTypes.string,
    message: PropTypes.string,
    state: PropTypes.string,
  }).isRequired,
  setData: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(UserConnectionNode);
