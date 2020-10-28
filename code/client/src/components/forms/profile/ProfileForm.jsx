import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { handlerWrapper, updateHandler } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { COMMON, FORM } from 'shared/constants/localeMessages';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';
import * as InputTypes from 'shared/constants/inputTypes';

import { SimpleFloatingElement } from '../../portals';
import ProfileFormHeader from './ProfileFormHeader';
import { Input } from '../common';
import { FormBody } from 'clientSrc/styles/blocks/settings';

const ProfileForm = ({ data }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormValid: true,
    isFormSending: false,
    inputs: {},
    errors: {},
  });

  useEffect(() => () => timer && clearTimeout(timer), []);

  // todo: Replace all those handleClick all around with some handy helper function
  const handleClick = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: COMMON.SENDING,
    }));

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: FORM.SAVE,
      })), SUBMIT_TIMEOUT));
  });

  const { photo, name, email, visibility } = data;
  const { submitMessage, errors, isFormValid, isFormSending, inputs } = state;

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={handleClick}
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
};

export default ProfileForm;
