import React from 'react';
import PropTypes from 'prop-types';
import { DeleteForever, MeetingRoom } from '@material-ui/icons';

import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock, HouseholdHeader,
  HouseholdPhoto, HouseholdSubtitle, HouseholdTitle,
  RoleLabel, UserName, UserPhoto,
} from 'clientSrc/styles/blocks/households';
import { FormButtonContentWrapper } from 'clientSrc/styles/blocks/form';
import { getLabelColors}  from 'clientSrc/helpers/household';
import { HOUSEHOLD } from 'shared/constants/localeMessages';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';

import { LocaleText } from '../common';
import { PrimaryButton } from '../forms';

//todo: Use members.find to find current user data by id from global store
const HouseholdFormHeader = ({ photo, name, membersCount }) => {
  const currentUser = {
    photo: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    name: 'USER USER',
    role: HOUSEHOLD_ROLE_TYPE.MANAGER,
  };

  const leaveHandler = () => console.log('leaving...');
  const deleteHandler = () => console.log('deleting...');

  return (
    <HouseholdHeader>
      <CurrentUserBlock>
        <UserPhoto src={currentUser.photo} />
        <UserName>{currentUser.name}</UserName>
        <RoleLabel {...getLabelColors(currentUser.role)}>{currentUser.role}</RoleLabel>
      </CurrentUserBlock>

      <HouseholdPhoto src={photo} />
      <HouseholdTitle>{name}</HouseholdTitle>
      <HouseholdSubtitle>
        <LocaleText message={HOUSEHOLD.MEMBERS} modifierFunc={text => `${membersCount} ${text}`} />
      </HouseholdSubtitle>

      <CriticalButtonsBlock>
        <PrimaryButton
          background="var(--cRedPrimary)"
          backgroundHover="var(--cRedPrimary)"
          margin="0 0 15px"
          clickHandler={leaveHandler}
        >
          <FormButtonContentWrapper>
            <ButtonIconSpan>
              <MeetingRoom />
            </ButtonIconSpan>
            <LocaleText message={HOUSEHOLD.LEAVE} />
          </FormButtonContentWrapper>
        </PrimaryButton>
        <PrimaryButton
          background="var(--cRedSecondary)"
          backgroundHover="var(--cRedSecondary)"
          margin="0 0 15px"
          clickHandler={deleteHandler}
        >
          <FormButtonContentWrapper>
            <ButtonIconSpan>
              <DeleteForever />
            </ButtonIconSpan>
            <LocaleText message={HOUSEHOLD.DELETE} />
          </FormButtonContentWrapper>
        </PrimaryButton>
      </CriticalButtonsBlock>
    </HouseholdHeader>
  )
};

HouseholdFormHeader.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  membersCount: PropTypes.number.isRequired,
};

export default HouseholdFormHeader;
