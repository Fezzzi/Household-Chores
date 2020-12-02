import React from 'react'
import PropTypes from 'prop-types'
import { DeleteForever, MeetingRoom, Add } from '@material-ui/icons'

import { COLORS } from 'clientSrc/constants'
import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock,
  HouseholdSubtitle, RoleLabel, UserName, UserPhoto,
} from 'clientSrc/styles/blocks/households'
import { FormHeader, FormButtonContentWrapper, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form'
import { getLabelColors } from 'clientSrc/helpers/household'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_KEYS } from 'shared/constants/settingsDataKeys'

import { LocaleText, PrimaryButton, EditableTextField, EditablePhotoField } from '../../common'

const HouseholdFormHeader = ({
  photo, name, inputs, errors, currentUser, membersCount, setFormState,
  sendingField, onLeaveHousehold, onDeleteHousehold, onCreateHousehold,
}) => {
  const criticalButton = (handleClick, color, message, icon) => (
    <PrimaryButton
      background={color}
      backgroundHover={color}
      margin="0 0 15px"
      onClick={handleClick}
      disabled={sendingField !== null}
    >
      <FormButtonContentWrapper>
        <ButtonIconSpan>
          {icon}
        </ButtonIconSpan>
        <LocaleText message={sendingField?.[message] ?? message} />
      </FormButtonContentWrapper>
    </PrimaryButton>
  )

  return (
    <FormHeader>
      <CurrentUserBlock>
        <EditablePhotoField
          name={HOUSEHOLD_KEYS.USER_PHOTO}
          placeholder={currentUser.photo}
          error={errors[HOUSEHOLD_KEYS.USER_PHOTO]}
          setFormState={setFormState}
          size={100}
          iconRight={40}
        >
          <UserPhoto src={currentUser.photo} />
        </EditablePhotoField>
        <UserName>
          <EditableTextField
            name={HOUSEHOLD_KEYS.USER_NAME}
            edited={!!inputs[HOUSEHOLD_KEYS.USER_NAME]}
            placeholder={currentUser.name}
            error={errors[HOUSEHOLD_KEYS.USER_NAME]}
            setFormState={setFormState}
          >
            {currentUser.name}
          </EditableTextField>
        </UserName>

        <RoleLabel {...getLabelColors(currentUser.role)}>{currentUser.role}</RoleLabel>
      </CurrentUserBlock>

      <EditablePhotoField
        name={HOUSEHOLD_KEYS.PHOTO}
        placeholder={photo}
        error={errors[HOUSEHOLD_KEYS.PHOTO]}
        setFormState={setFormState}
      >
        <FormHeaderPhoto src={photo} />
      </EditablePhotoField>
      <FormHeaderTitle>
        <EditableTextField
          name={HOUSEHOLD_KEYS.NAME}
          edited={!!inputs[HOUSEHOLD_KEYS.NAME]}
          placeholder={name}
          error={errors[HOUSEHOLD_KEYS.NAME]}
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
        {onLeaveHousehold && criticalButton(onLeaveHousehold, COLORS.RED_PRIMARY, HOUSEHOLD.LEAVE, <MeetingRoom />)}
        {onDeleteHousehold && criticalButton(onDeleteHousehold, COLORS.RED_SECONDARY, HOUSEHOLD.DELETE, <DeleteForever />)}
        {onCreateHousehold && criticalButton(onCreateHousehold, COLORS.GREEN_SECONDARY, HOUSEHOLD.CREATE, <Add />)}
      </CriticalButtonsBlock>
    </FormHeader>
  )
}

HouseholdFormHeader.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  membersCount: PropTypes.number.isRequired,
  setFormState: PropTypes.func.isRequired,
  sendingField: PropTypes.object,
  onLeaveHousehold: PropTypes.func,
  onDeleteHousehold: PropTypes.func,
  onCreateHousehold: PropTypes.func,
}

export default HouseholdFormHeader
