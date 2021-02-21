import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { HighlightOff, LockOpen } from '@material-ui/icons'

import { useUpdateHandler } from 'clientSrc/helpers/form'
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form'
import {
  ProfileHeaderSubtitle, ProfilePasswordBlock, ProfilePasswordClose, ProfilePasswordIcon,
  ProfilePasswordInputs, ProfilePasswordTitle, ProfileSwitchesBlock,
} from 'clientSrc/styles/blocks/settings'
import { INPUT_TYPE } from 'shared/constants'
import { FORM } from 'shared/constants/localeMessages'

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
                  <HighlightOff />
                </ProfilePasswordClose>
                <Input
                  name="oldPassword"
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.OLD_PASSWORD}
                  inputError={errors.oldPassword}
                  onUpdate={useUpdateHandler(setFormState)}
                />
                <Input
                  name="newPassword"
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.NEW_PASSWORD}
                  inputError={errors.newPassword}
                  onUpdate={useUpdateHandler(setFormState)}
                />
              </ProfilePasswordInputs>
            ) : (
              <>
                <ProfilePasswordIcon>
                  <LockOpen />
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
