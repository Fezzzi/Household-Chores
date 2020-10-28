import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HighlightOff, LockOpen } from '@material-ui/icons';

import { updateHandler } from 'clientSrc/helpers/form';
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form';
import {
  ProfileHeaderSubtitle,
  ProfilePasswordBlock, ProfilePasswordClose, ProfilePasswordIcon, ProfilePasswordInputs,
  ProfilePasswordTitle,
  ProfileSwitchesBlock,
} from 'clientSrc/styles/blocks/settings';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';

import LocaleSwitch from '../inputs/LocaleSwitch';
import ThemeSwitch from '../inputs/ThemeSwitch';
import Input from '../common/Input';
import EditableField from '../../common/EditableField';
import EditablePhotoField from '../../common/EditablePhotoField';
import EditableTextField from '../../common/EditableTextField';
import LocaleText from '../../common/LocaleText';

const ProfileFormHeader = ({ photo, name, email, inputs, errors, setFormState }) => {
  const [passwordEditing, setPasswordEditing] = useState(false);

  const clearPasswords = () => {
    setPasswordEditing(false);

    setFormState(prevState => {
      const newInputs = { ...prevState.inputs };
      delete newInputs['old-password'];
      delete newInputs['new-password'];

      const newErrors = { ...prevState.errors };
      delete newErrors['old-password'];
      delete newErrors['new-password'];

      return {
        ...prevState,
        inputs: newInputs,
        errors: newErrors,
      };
    });
  };

  return (
    <FormHeader>
      <ProfilePasswordBlock>
        <EditableField
          editing={passwordEditing}
          setEditing={setPasswordEditing}
          input={
            <ProfilePasswordInputs>
              <ProfilePasswordClose onClick={clearPasswords}>
                <HighlightOff />
              </ProfilePasswordClose>
              <Input
                name="old-password"
                type={InputTypes.PASSWORD}
                message={FORM.OLD_PASSWORD}
                inputError={errors['old-password']}
                updateInput={updateHandler('old-password', setFormState)}
              />
              <Input
                name="new-password"
                type={InputTypes.PASSWORD}
                message={FORM.NEW_PASSWORD}
                inputError={errors['new-password']}
                updateInput={updateHandler('new-password', setFormState)}
              />
            </ProfilePasswordInputs>
          }
        >
          <ProfilePasswordIcon>
            <LockOpen />
          </ProfilePasswordIcon>
          <ProfilePasswordTitle>
            <LocaleText message={FORM.CHANGE_PASSWORD} />
          </ProfilePasswordTitle>
        </EditableField>
      </ProfilePasswordBlock>

      <EditablePhotoField
        name="photo"
        placeholder={photo}
        setFormState={setFormState}
        error={errors.photo}
      >
        <FormHeaderPhoto src={photo} />
      </EditablePhotoField>
      <FormHeaderTitle>
        <EditableTextField
          name="name"
          edited={inputs.name}
          placeholder={name}
          setFormState={setFormState}
          error={errors.name}
        >
          {name}
        </EditableTextField>
      </FormHeaderTitle>
      <ProfileHeaderSubtitle>
        <EditableTextField
          name="email"
          edited={inputs.email}
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
  );
};

ProfileFormHeader.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  inputs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
};

export default ProfileFormHeader;
