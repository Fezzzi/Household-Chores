import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ChevronLeft } from '@material-ui/icons';

import { getConnectionsButtonConfig } from 'clientSrc/helpers/connectionButtons';
import { ToggleInputIcon } from 'clientSrc/styles/blocks/form';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as InputTypes from 'shared/constants/inputTypes';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';
import { COMMON } from 'shared/constants/localeMessages';

import { PrimaryButton, TextInput } from '../forms';
import LocaleText from '../common/LocaleText';

const UserConnectionNode = ({ tab, size, user, userData, setData, addNotification }) => {
  const [buttons, setButtons] = useState({});
  const [connectMessage, setConnectMessage] = useState(null);

  useEffect(() => setButtons(
    getConnectionsButtonConfig(tab, user, userData, setData, setButtons, addNotification)
  ), [userData]);

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
        {state && userMessage && state === CONNECTION_STATE_TYPE.WAITING && (
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
  userData: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(UserConnectionNode);

const UserNode = styled.div`
  display: inline-flex;
  width: ${props => props.size ?? 420}px;
  min-width: ${props => props.size ?? 420}px;
  min-height: 100px;
  padding: 10px;
`;

const UserPhotoBox = styled.div`
  display: inline-block;
`;

const UserPhoto = styled.img`
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 10px;
`;

const UserInfoBox = styled.div`
  display: inline-block;
  width: 100%;
`;

const UserName = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 1.4em;
  margin: 10px 0;
`;

const AppendMessage = styled.div`
  display: block;
  width: max-content;
  opacity: ${props => props.reactive ? '0.6' : '0.8'};
  font-style: italic;
  font-weight: ${props => props.reactive ? 300 : 400};
  font-size: 1.1em;
  
  ${props => props.reactive && `
    &:hover {
      cursor: pointer;
      font-weight: 400;
      opacity: 0.8;
    }`
}
`;

const UserButtonsBox = styled.div`
  width: 100%;
  margin-top: 5px;
  font-size: 14px;
`;
