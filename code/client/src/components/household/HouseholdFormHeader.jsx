import React from 'react';
import PropTypes from 'prop-types';
import { DeleteForever, MeetingRoom, Add } from '@material-ui/icons';

import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock, HouseholdHeader,
  HouseholdPhoto, HouseholdSubtitle, HouseholdTitle,
  RoleLabel, UserName, UserPhoto,
} from 'clientSrc/styles/blocks/households';
import { FormButtonContentWrapper } from 'clientSrc/styles/blocks/form';
import { getLabelColors } from 'clientSrc/helpers/household';
import * as InputTypes from 'shared/constants/inputTypes';
import { HOUSEHOLD } from 'shared/constants/localeMessages';

import EditableTextField from 'clientSrc/components/common/EditableTextField';
import { LocaleText } from '../common';
import { PrimaryButton } from '../forms';
import EditablePhotoField from 'clientSrc/components/common/EditablePhotoField';

const HouseholdFormHeader = ({
  photo, name, currentUser, membersCount, setFormState, onLeaveHousehold, onDeleteHousehold, onCreateHousehold
}) => {
  const criticalButton = (handleClick, color, message, icon) => (
    <PrimaryButton
      background={color}
      backgroundHover={color}
      margin="0 0 15px"
      clickHandler={handleClick}
    >
      <FormButtonContentWrapper>
        <ButtonIconSpan>
          {icon}
        </ButtonIconSpan>
        <LocaleText message={message} />
      </FormButtonContentWrapper>
    </PrimaryButton>
  )

  return (
    <HouseholdHeader>
      <CurrentUserBlock>
        <EditablePhotoField
          name="userPhoto"
          placeholder={currentUser.photo}
          setFormState={setFormState}
          size={100}
          iconRight={40}
        >
          <UserPhoto src={currentUser.photo} />
        </EditablePhotoField>
        <UserName>
          <EditableTextField name="userName" placeholder={currentUser.name} setFormState={setFormState}>
            {currentUser.name}
          </EditableTextField>
        </UserName>

        <RoleLabel {...getLabelColors(currentUser.role)}>{currentUser.role}</RoleLabel>
      </CurrentUserBlock>

      <EditablePhotoField name="householdPhoto" placeholder={photo} setFormState={setFormState}>
        <HouseholdPhoto src={photo} />
      </EditablePhotoField>
      <HouseholdTitle>
        <EditableTextField name="householdName" type={InputTypes.TEXT} placeholder={name} setFormState={setFormState}>
          {name}
        </EditableTextField>
      </HouseholdTitle>
      {membersCount > 0 && (
        <HouseholdSubtitle>
          <LocaleText message={HOUSEHOLD.MEMBERS} modifierFunc={text => `${membersCount} ${text}`} />
        </HouseholdSubtitle>
      )}

      <CriticalButtonsBlock>
        {onLeaveHousehold && criticalButton(onLeaveHousehold, 'var(--cRedPrimary)', HOUSEHOLD.LEAVE, <MeetingRoom />)}
        {onDeleteHousehold && criticalButton(onDeleteHousehold, 'var(--cRedSecondary)', HOUSEHOLD.DELETE, <DeleteForever />)}
        {onCreateHousehold && criticalButton(onCreateHousehold, 'var(--cGreenSecondary)', HOUSEHOLD.CREATE, <Add />)}
      </CriticalButtonsBlock>
    </HouseholdHeader>
  );
};

HouseholdFormHeader.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  membersCount: PropTypes.number.isRequired,
  setFormState: PropTypes.func.isRequired,
  onLeaveHousehold: PropTypes.func,
  onDeleteHousehold: PropTypes.func,
  onCreateHousehold: PropTypes.func,
};

export default HouseholdFormHeader;
