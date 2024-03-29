import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { INPUT_TYPE } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'
import { CloseIcon, LockIcon } from 'web/styles/icons'
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'web/styles/blocks/form'
import {
  ProfileHeaderSubtitle, ProfilePasswordBlock, ProfilePasswordClose, ProfilePasswordIcon,
  ProfilePasswordInputs, ProfilePasswordTitle, ProfileSwitchesBlock,
} from 'web/styles/blocks/settings'
import { useUpdateHandler } from 'web/helpers/form'

import {
  LocaleText, Input, LocaleSwitch, ThemeSwitch, EditableField, EditablePhotoField, EditableTextField,
} from '../../common'

const ProfileFormHeader = ({ photo, nickname, email, inputs, errors, setFormState }) => {
  const [passwordEditing, setPasswordEditing] = useState(false)

  const clearPasswords = useCallback(e => {
    e.stopPropagation()
    setPasswordEditing(false)

    setFormState(prevState => {
      const newInputs = { ...prevState.inputs }
      delete newInputs.oldPassword
      delete newInputs.newPassword

      const newErrors = { ...prevState.errors }
      delete newErrors.oldPassword
      delete newErrors.newPassword

      return {
        ...prevState,
        inputs: newInputs,
        errors: newErrors,
      }
    })
  }, [setPasswordEditing, setFormState])

  const updateHandler = useUpdateHandler(setFormState)

  return (
    <FormHeader>
      <ProfilePasswordBlock>
        <EditableField
          editing={passwordEditing}
          setEditing={setPasswordEditing}
          iconRight={10}
          centered={false}
        >
          {passwordEditing
            ? (
              <ProfilePasswordInputs>
                <ProfilePasswordClose onClick={clearPasswords}>
                  <CloseIcon />
                </ProfilePasswordClose>
                <Input
                  name="oldPassword"
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.OLD_PASSWORD}
                  inputError={errors.oldPassword}
                  onUpdate={updateHandler}
                />
                <Input
                  name="newPassword"
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.NEW_PASSWORD}
                  inputError={errors.newPassword}
                  onUpdate={updateHandler}
                />
              </ProfilePasswordInputs>
            ) : (
              <>
                <ProfilePasswordIcon>
                  <LockIcon />
                </ProfilePasswordIcon>
                <ProfilePasswordTitle>
                  <LocaleText message={FORM.CHANGE_PASSWORD} />
                </ProfilePasswordTitle>
              </>
            )}
        </EditableField>
      </ProfilePasswordBlock>

      <EditablePhotoField
        name="photo"
        setFormState={setFormState}
        error={errors.photo}
      >
        <FormHeaderPhoto src={photo} />
      </EditablePhotoField>
      <FormHeaderTitle>
        <EditableTextField
          name="nickname"
          edited={!!inputs.nickname}
          placeholder={nickname}
          setFormState={setFormState}
          error={errors.nickname}
        >
          {nickname}
        </EditableTextField>
      </FormHeaderTitle>
      <ProfileHeaderSubtitle>
        <EditableTextField
          name="email"
          edited={!!inputs.email}
          placeholder={email}
          isEmail
          setFormState={setFormState}
          error={errors.email}
        >
          {email}
        </EditableTextField>
      </ProfileHeaderSubtitle>

      <ProfileSwitchesBlock>
        <ThemeSwitch />
        <LocaleSwitch />
      </ProfileSwitchesBlock>
    </FormHeader>
  )
}

ProfileFormHeader.propTypes = {
  photo: PropTypes.string,
  nickname: PropTypes.string,
  email: PropTypes.string,
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
}

export default ProfileFormHeader
