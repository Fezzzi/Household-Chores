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
import { PROFILE } from 'shared/constants/mappingKeys'

import {
  LocaleText, Input, LocaleSwitch, ThemeSwitch, EditableField, EditablePhotoField, EditableTextField,
} from '../../common'

const ProfileFormHeader = ({ photo, name, email, inputs, errors, setFormState }) => {
  const [passwordEditing, setPasswordEditing] = useState(false)

  const clearPasswords = useCallback(e => {
    e.stopPropagation()
    setPasswordEditing(false)

    setFormState(prevState => {
      const newInputs = { ...prevState.inputs }
      delete newInputs[PROFILE.OLD_PASSWORD]
      delete newInputs[PROFILE.NEW_PASSWORD]

      const newErrors = { ...prevState.errors }
      delete newErrors[PROFILE.OLD_PASSWORD]
      delete newErrors[PROFILE.NEW_PASSWORD]

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
                  name={PROFILE.OLD_PASSWORD}
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.OLD_PASSWORD}
                  inputError={errors[PROFILE.OLD_PASSWORD]}
                  onUpdate={useUpdateHandler(setFormState)}
                />
                <Input
                  name={PROFILE.NEW_PASSWORD}
                  type={INPUT_TYPE.PASSWORD}
                  value={FORM.NEW_PASSWORD}
                  inputError={errors[PROFILE.NEW_PASSWORD]}
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
        name={PROFILE.PHOTO}
        setFormState={setFormState}
        error={errors[PROFILE.PHOTO]}
      >
        <FormHeaderPhoto src={photo} />
      </EditablePhotoField>
      <FormHeaderTitle>
        <EditableTextField
          name={PROFILE.NAME}
          edited={!!inputs[PROFILE.NAME]}
          placeholder={name}
          setFormState={setFormState}
          error={errors[PROFILE.NAME]}
        >
          {name}
        </EditableTextField>
      </FormHeaderTitle>
      <ProfileHeaderSubtitle>
        <EditableTextField
          name={PROFILE.EMAIL}
          edited={!!inputs[PROFILE.EMAIL]}
          placeholder={email}
          isEmail
          setFormState={setFormState}
          error={errors[PROFILE.EMAIL]}
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
  name: PropTypes.string,
  email: PropTypes.string,
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
}

export default ProfileFormHeader
