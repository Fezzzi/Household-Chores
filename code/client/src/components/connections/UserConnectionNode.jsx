import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ChevronLeft } from '@material-ui/icons';

import { useConnectionButtons } from 'clientSrc/helpers/connectionButtons';
import { ToggleInputIcon } from 'clientSrc/styles/blocks/form';
import {
  AppendMessage, UserButtonsBox, UserInfoBox, UserName, UserNode, UserPhotoBox, UserPhoto,
} from 'clientSrc/styles/blocks/users';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as InputTypes from 'shared/constants/inputTypes';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { COMMON } from 'shared/constants/localeMessages';

import { TABS } from 'shared/constants/settingTypes';
import { PrimaryButton, TextInput } from '../forms';
import LocaleText from '../common/LocaleText';

const UserConnectionNode = ({ tab, size, user, setData, addNotification }) => {
  const [buttons, setButtons] = useState({});
  const [connectMessage, setConnectMessage] = useState(null);

  useEffect(() => setButtons(
    useConnectionButtons(tab, user, setData, setButtons, addNotification)
  ), [setData]);

  const { id, nickname, photo, state, message: userMessage } = user;
  return (
    <UserNode size={size}>
      <UserPhotoBox><UserPhoto src={photo} /></UserPhotoBox>
      <UserInfoBox>
        <UserName>{nickname}</UserName>
        {!state && (connectMessage === null
          ? (
            <AppendMessage reactive>
              <LocaleText message={COMMON.ADD_MESSAGE} clickHandler={() => setConnectMessage('')} />
            </AppendMessage>
          ) : (
            <>
              <TextInput
                name="message"
                message={COMMON.MESSAGE}
                updateInput={(_, value) => setConnectMessage(value)}
                type={InputTypes.TEXT}
                inline
              />
              <ToggleInputIcon left={-20}>
                <ChevronLeft onClick={() => setConnectMessage(null)} />
              </ToggleInputIcon>
            </>
          )
        )}
        {(tab === TABS.FIND_CONNECTION || tab === TABS.PENDING) && state === CONNECTION_STATE_TYPE.WAITING && userMessage && (
          <AppendMessage>
            {userMessage}
          </AppendMessage>
        )}
        <UserButtonsBox>
          {Object.keys(buttons).map(label => {
            const {
              active, message: buttonMessage, color, background, backgroundHover, disabled, clickHandler,
            } = buttons[label];
            return active && (
              <PrimaryButton
                key={`${id}-${label}`}
                disabled={disabled}
                clickHandler={clickHandler(connectMessage)}
                inline
                margin="3px 5px 3px 0"
                color={color}
                background={background}
                backgroundHover={backgroundHover}
              >
                <LocaleText message={buttonMessage || label} />
              </PrimaryButton>
            );
          })}
        </UserButtonsBox>
      </UserInfoBox>
    </UserNode>
  );
};

UserConnectionNode.propTypes = {
  tab: PropTypes.string.isRequired,
  size: PropTypes.number,
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
