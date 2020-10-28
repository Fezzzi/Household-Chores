import React from 'react';
import PropTypes from 'prop-types';
import { DeleteForever, MeetingRoom, Add } from '@material-ui/icons';

import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock,
  HouseholdSubtitle, RoleLabel, UserName, UserPhoto,
} from 'clientSrc/styles/blocks/households';
import {
  FormHeader, FormButtonContentWrapper, FormHeaderPhoto, FormHeaderTitle,
} from 'clientSrc/styles/blocks/form';
import { getLabelColors } from 'clientSrc/helpers/household';
import { HOUSEHOLD } from 'shared/constants/localeMessages';

import EditableTextField from 'clientSrc/components/common/EditableTextField';
import EditablePhotoField from 'clientSrc/components/common/EditablePhotoField';
import LocaleText from '../../common/LocaleText';
import PrimaryButton from '../common/PrimaryButton';

const HouseholdFormHeader = ({
  photo, name, inputs, errors, currentUser, membersCount, setFormState,
  sendingField, onLeaveHousehold, onDeleteHousehold, onCreateHousehold,
}) => {
  const criticalButton = (handleClick, color, message, icon) => (
    <PrimaryButton
      background={color}
      backgroundHover={color}
      margin="0 0 15px"
      clickHandler={handleClick}
      disabled={sendingField !== null}
    >
      <FormButtonContentWrapper>
        <ButtonIconSpan>
          {icon}
        </ButtonIconSpan>
        <LocaleText message={sendingField?.[message] ?? message} />
      </FormButtonContentWrapper>
    </PrimaryButton>
  );

  return (
    <FormHeader>
      <CurrentUserBlock>
        <EditablePhotoField
          name="userPhoto"
          edited={inputs.userPhoto}
          placeholder={currentUser.photo}
          error={errors.userPhoto}
          setFormState={setFormState}
          size={100}
          iconRight={40}
        >
          <UserPhoto src={currentUser.photo} />
        </EditablePhotoField>
        <UserName>
          <EditableTextField
            name="userName"
            edited={inputs.userName}
            placeholder={currentUser.name}
            error={errors.userName}
            setFormState={setFormState}
          >
            {currentUser.name}
          </EditableTextField>
        </UserName>

        <RoleLabel {...getLabelColors(currentUser.role)}>{currentUser.role}</RoleLabel>
      </CurrentUserBlock>

      <EditablePhotoField
        name="householdPhoto"
        placeholder={photo}
        error={errors.householdPhoto}
        setFormState={setFormState}
      >
        <FormHeaderPhoto src={photo} />
      </EditablePhotoField>
      <FormHeaderTitle>
        <EditableTextField
          name="householdName"
          placeholder={name}
          error={errors.householdName}
          setFormState={setFormState}
        >
          {name}
        </EditableTextField>
      </FormHeaderTitle>
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
    </FormHeader>
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
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  membersCount: PropTypes.number.isRequired,
  setFormState: PropTypes.func.isRequired,
  sendingField: PropTypes.object,
  onLeaveHousehold: PropTypes.func,
  onDeleteHousehold: PropTypes.func,
  onCreateHousehold: PropTypes.func,
};

export default HouseholdFormHeader;
