import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from '@material-ui/icons';

import { useHouseholdButtonHandlers } from 'clientSrc/helpers/household';
import {
  UserButtonsBox, UserName, UserNode, UserPhotoBox, UserPhoto, AppendMessageIcon, WrapperBox,
  AppendMessageAnchor, UserPhotoMoreBox, MiniUserName, MiniUserPhoto, UserFloatingNameBox,
} from 'clientSrc/styles/blocks/users';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { FORM } from 'shared/constants/localeMessages';

import PrimaryButton from '../common/PrimaryButton';
import LocaleText from '../../common/LocaleText';
import { InfoTooltip } from '../../portals';

const HouseholdInvitationNode = ({ invitation, setData, addNotification }) => {
  const {
    fromId, fromNickname, fromPhoto,
    id_household: householdId, name, message: invitationMessage, photo,
  } = invitation;
  const { approveHandler, removeHandler } = useHouseholdButtonHandlers(householdId, fromId, setData, addNotification);

  return (
    <WrapperBox>
      <UserNode>
        <UserPhotoBox>
          <UserPhotoMoreBox>
            <UserFloatingNameBox>
              <MiniUserName title={fromNickname}>{fromNickname}</MiniUserName>
            </UserFloatingNameBox>
            <MiniUserPhoto src={fromPhoto} />
          </UserPhotoMoreBox>
          <UserPhoto src={photo} />
          {invitationMessage && (
            <AppendMessageAnchor>
              <InfoTooltip
                icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                text={invitationMessage}
              />
            </AppendMessageAnchor>
          )}
        </UserPhotoBox>
        <UserName>{name}</UserName>
        <UserButtonsBox>
          <PrimaryButton
            clickHandler={approveHandler}
            margin="0 0 6px"
            background="var(--cBluePrimary)"
            backgroundHover="var(--cBlueSecondary)"
          >
            <LocaleText message={FORM.CONNECTION_APPROVE} />
          </PrimaryButton>
          <PrimaryButton
            clickHandler={removeHandler}
            margin="0 0 6px"
            color="var(--cFont)"
            background="var(--cLightPrimary)"
            backgroundHover="var(--cLightSecondary)"
          >
            <LocaleText message={FORM.CONNECTION_IGNORE} />
          </PrimaryButton>
        </UserButtonsBox>
      </UserNode>
    </WrapperBox>
  );
};

HouseholdInvitationNode.propTypes = {
  invitation: PropTypes.shape({
    fromId: PropTypes.number.isRequired,
    fromNickname: PropTypes.string.isRequired,
    fromPhoto: PropTypes.string.isRequired,
    id_household: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    message: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  setData: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(HouseholdInvitationNode);
