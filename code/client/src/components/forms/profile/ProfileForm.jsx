import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { updateHandler } from 'clientSrc/helpers/form';
import { FORM } from 'shared/constants/localeMessages';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';
import * as InputTypes from 'shared/constants/inputTypes';

import { FormBody } from 'clientSrc/styles/blocks/settings';
import { SimpleFloatingElement } from '../../portals';
import ProfileFormHeader from './ProfileFormHeader';
import Input from '../common/Input';

const ProfileForm = ({ data, submitHandler }) => {
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormValid: true,
    isFormSending: false,
    inputs: {},
    errors: {},
  });

  const { photo, name, email, visibility } = data;
  const { submitMessage, errors, isFormValid, isFormSending, inputs } = state;

  const handleSubmit = submitHandler(inputs, setState, FORM.SAVE, FORM.SAVING);

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={handleSubmit}
        />
      )}
      <ProfileFormHeader
        photo={photo}
        name={name}
        email={email}
        inputs={inputs}
        errors={errors}
        setFormState={setState}
      />

      <FormBody>
        <Input
          name="connection-visibility"
          type={InputTypes.SWITCH}
          label={FORM.USER_VISIBILITY}
          values={[USER_VISIBILITY_TYPE.FOF, USER_VISIBILITY_TYPE.ALL]}
          placeholder={visibility}
          updateInput={updateHandler('connection-visibility', setState, undefined, visibility)}
        />
      </FormBody>
    </>
  );
};

ProfileForm.propTypes = {
  data: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    visibility: PropTypes.string,
  }).isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default ProfileForm;
