import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { COMMON, HOUSEHOLD } from 'shared/constants/localeMessages'
import { COLORS } from 'web/constants'
import { PlusIcon, DoorIcon, DeleteForeverIcon } from 'web/styles/icons'
import {
  ButtonIconSpan, CriticalButtonsBlock, CurrentUserBlock,
  HouseholdSubtitle, RoleLabel, UserLabel, UserName, UserPhoto,
} from 'web/styles/blocks/households'
import { FormHeader, FormButtonContentWrapper, FormHeaderPhoto, FormHeaderTitle } from 'web/styles/blocks/form'
import { getLabelColors } from 'web/helpers/household'
import { useOpenConfirmationDialog } from 'web/helpers/confirmations'

import { LocaleText, PrimaryButton, EditableTextField, EditablePhotoField, EditableLabelField } from '../../common'

const HouseholdFormHeader = ({
  photo, name, inputs, errors, currentUser, membersCount, editableRole, isAdmin,
  setFormState, sendingField, onLeaveHousehold, onDeleteHousehold, onCreateHousehold,
}) => {
  const currentRole = useMemo(() => inputs.userRole ?? currentUser.role, [inputs, currentUser])

  const availableRoles = useMemo(() => {
    const allRoles = Object.values(HOUSEHOLD_ROLE_TYPE)
    const currentRoleIndex = allRoles.indexOf(currentUser.role)
    return allRoles.filter(role => allRoles.indexOf(role) >= currentRoleIndex)
  }, [currentUser])

  const openConfirmationDialog = useOpenConfirmationDialog()

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
          name="userPhoto"
          error={errors.userPhoto}
          setFormState={setFormState}
          size={100}
          iconRight={40}
        >
          <UserPhoto src={currentUser.photo} />
        </EditablePhotoField>
        <UserName>
          <EditableTextField
            name="userNickname"
            edited={!!inputs.userNickname}
            placeholder={currentUser.nickname}
            error={errors.userNickname}
            setFormState={setFormState}
          >
            {currentUser.nickname}
          </EditableTextField>
        </UserName>

        {editableRole && availableRoles.length > 1
          ? (
            <EditableLabelField
              name="userRole"
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
            name="photo"
            error={errors.photo}
            setFormState={setFormState}
          >
            <FormHeaderPhoto src={photo} />
          </EditablePhotoField>
        ) : <FormHeaderPhoto src={photo} />}
      <FormHeaderTitle>
        {isAdmin
          ? (
            <EditableTextField
              name="name"
              edited={!!inputs.name}
              placeholder={name}
              error={errors.name}
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
        {onLeaveHousehold && criticalButton(
          () => openConfirmationDialog(onLeaveHousehold, null, COMMON.CANT_UNDO),
          COLORS.RED_PRIMARY,
          HOUSEHOLD.LEAVE,
          <DoorIcon />
        )}
        {onDeleteHousehold && criticalButton(
          () => openConfirmationDialog(onDeleteHousehold, null, COMMON.CANT_UNDO),
          COLORS.RED_SECONDARY,
          HOUSEHOLD.DELETE,
          <DeleteForeverIcon />
        )}
        {onCreateHousehold && criticalButton(
          onCreateHousehold,
          COLORS.GREEN_SECONDARY,
          HOUSEHOLD.CREATE,
          <PlusIcon />
        )}
      </CriticalButtonsBlock>
    </FormHeader>
  )
}

HouseholdFormHeader.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.number,
    photo: PropTypes.string,
    nickname: PropTypes.string,
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
