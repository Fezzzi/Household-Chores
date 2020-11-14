import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HighlightOff, LockOpen } from '@material-ui/icons';

import { updateHandler } from 'clientSrc/helpers/form';
import { FormHeader, FormHeaderPhoto, FormHeaderTitle } from 'clientSrc/styles/blocks/form';
import {
  ProfileHeaderSubtitle, ProfilePasswordBlock, ProfilePasswordClose, ProfilePasswordIcon,
  ProfilePasswordInputs, ProfilePasswordTitle, ProfileSwitchesBlock,
} from 'clientSrc/styles/blocks/settings';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';
import { PROFILE } from 'shared/constants/settingsDataKeys';

import LocaleSwitch from '../inputs/LocaleSwitch';
import ThemeSwitch from '../inputs/ThemeSwitch';
import Input from '../common/Input';
import EditableField from '../../common/EditableField';
import EditablePhotoField from '../../common/EditablePhotoField';
import EditableTextField from '../../common/EditableTextField';
import LocaleText from '../../common/LocaleText';

const ProfileFormHeader = ({ photo, name, email, inputs, errors, setFormState }) => {
  const [passwordEditing, setPasswordEditing] = useState(false);

  // todo: Fix input hiding
  const clearPasswords = () => {
    setPasswordEditing(false);

    setFormState(prevState => {
      const newInputs = { ...prevState.inputs };
      delete newInputs[PROFILE.OLD_PASSWORD];
      delete newInputs[PROFILE.NEW_PASSWORD];

      const newErrors = { ...prevState.errors };
      delete newErrors[PROFILE.OLD_PASSWORD];
      delete newErrors[PROFILE.NEW_PASSWORD];

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
          iconRight={40}
          centered={false}
          input={
            <ProfilePasswordInputs>
              <ProfilePasswordClose onClick={clearPasswords}>
                <HighlightOff />
              </ProfilePasswordClose>
              <Input
                name={PROFILE.OLD_PASSWORD}
                type={InputTypes.PASSWORD}
                message={FORM.OLD_PASSWORD}
                inputError={errors[PROFILE.OLD_PASSWORD]}
                updateInput={updateHandler(PROFILE.OLD_PASSWORD, setFormState)}
              />
              <Input
                name={PROFILE.NEW_PASSWORD}
                type={InputTypes.PASSWORD}
                message={FORM.NEW_PASSWORD}
                inputError={errors[PROFILE.NEW_PASSWORD]}
                updateInput={updateHandler(PROFILE.NEW_PASSWORD, setFormState)}
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
        name={PROFILE.PHOTO}
        placeholder={photo}
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
