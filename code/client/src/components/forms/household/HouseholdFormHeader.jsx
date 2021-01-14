import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { DeleteForever, MeetingRoom, Add } from '@material-ui/icons'

import { COLORS } from 'clientSrc/constants'
import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock,
  HouseholdSubtitle, RoleLabel, UserLabel, UserName, UserPhoto,
} from 'clientSrc/styles/blocks/households'
import { FormHeader, FormButtonContentWrapper, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form'
import { getLabelColors } from 'clientSrc/helpers/household'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_KEYS } from 'shared/constants/settingsDataKeys'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'

import { LocaleText, PrimaryButton, EditableTextField, EditablePhotoField, EditableLabelField } from '../../common'

const HouseholdFormHeader = ({
  photo, name, inputs, errors, currentUser, membersCount, editableRole, isAdmin,
  setFormState, sendingField, onLeaveHousehold, onDeleteHousehold, onCreateHousehold,
}) => {
  const currentRole = useMemo(() =>
    inputs[HOUSEHOLD_KEYS.USER_ROLE] ?? currentUser.role,
  [inputs, currentUser])

  const availableRoles = useMemo(() => {
    const allRoles = Object.values(HOUSEHOLD_ROLE_TYPE)
    const currentRoleIndex = allRoles.indexOf(currentUser.role)
    return allRoles.filter(role => allRoles.indexOf(role) >= currentRoleIndex)
  }, [currentUser])

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

        {editableRole && availableRoles.length > 1
          ? (
            <EditableLabelField
              name={HOUSEHOLD_KEYS.USER_ROLE}
              defaultValue={currentUser.role}
              placeholder={currentRole}
              values={availableRoles}
              setFormState={setFormState}
            >
              <RoleLabel {...getLabelColors(currentRole)}>{currentRole}</RoleLabel>
            </EditableLabelField>
          ) : <UserLabel><RoleLabel {...getLabelColors(currentUser.role)}>{currentUser.role}</RoleLabel></UserLabel>}
      </CurrentUserBlock>

      {isAdmin
        ? (
          <EditablePhotoField
            name={HOUSEHOLD_KEYS.PHOTO}
            error={errors[HOUSEHOLD_KEYS.PHOTO]}
            setFormState={setFormState}
          >
            <FormHeaderPhoto src={photo} />
          </EditablePhotoField>
        ) : <FormHeaderPhoto src={photo} />}
      <FormHeaderTitle>
        {isAdmin
          ? (
            <EditableTextField
              name={HOUSEHOLD_KEYS.NAME}
              edited={!!inputs[HOUSEHOLD_KEYS.NAME]}
              placeholder={name}
              error={errors[HOUSEHOLD_KEYS.NAME]}
              setFormState={setFormState}
            >
              {name}
            </EditableTextField>
          ) : name}
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
  editableRole: PropTypes.bool,
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  membersCount: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  setFormState: PropTypes.func.isRequired,
  sendingField: PropTypes.object,
  onLeaveHousehold: PropTypes.func,
  onDeleteHousehold: PropTypes.func,
  onCreateHousehold: PropTypes.func,
}

export default HouseholdFormHeader
