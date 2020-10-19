import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ChevronRight } from '@material-ui/icons';

import { useHouseholdButtonHandlers } from 'clientSrc/helpers/household';
import {
  AppendMessage, UserButtonsBox, UserInfoBox, UserName, UserNode, UserPhotoBox, UserPhoto, InvitationBox, UserNodeSeparator,
} from 'clientSrc/styles/blocks/users';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { FORM } from 'shared/constants/localeMessages';

import { PrimaryButton } from '../forms';
import LocaleText from '../common/LocaleText';

const HouseholdInvitationNode = ({ invitation, setData, addNotification }) => {
  const {
    fromId, fromNickname, fromPhoto,
    id_household: householdId, name, message: invitationMessage, photo,
  } = invitation;
  const { approveHandler, removeHandler } = useHouseholdButtonHandlers(householdId, fromId, setData, addNotification);

  return (
    <InvitationBox>
      <UserNode size={220}>
        <UserPhotoBox><UserPhoto src={fromPhoto} /></UserPhotoBox>
        <UserInfoBox>
          <UserName>{fromNickname}</UserName>
          {invitationMessage && (
            <AppendMessage>
              {invitationMessage}
            </AppendMessage>
          )}
        </UserInfoBox>
      </UserNode>
      <UserNodeSeparator>
        <ChevronRight />
      </UserNodeSeparator>
      <UserNode size={320}>
        <UserPhotoBox><UserPhoto src={photo} /></UserPhotoBox>
        <UserInfoBox>
          <UserName>{name}</UserName>
          <UserButtonsBox>
            <PrimaryButton
              clickHandler={approveHandler}
              inline
              margin="3px 5px 3px 0"
              background="var(--cBluePrimary)"
              backgroundHover="var(--cBlueSecondary)"
            >
              <LocaleText message={FORM.CONNECTION_APPROVE} />
            </PrimaryButton>
            <PrimaryButton
              clickHandler={removeHandler}
              inline
              margin="3px 5px 3px 0"
              color="var(--cFont)"
              background="var(--cLightPrimary)"
              backgroundHover="var(--cLightSecondary)"
            >
              <LocaleText message={FORM.CONNECTION_IGNORE} />
            </PrimaryButton>
          </UserButtonsBox>
        </UserInfoBox>
      </UserNode>
    </InvitationBox>
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
