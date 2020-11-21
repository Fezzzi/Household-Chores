import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { useFormState, useUpdateHandler } from 'clientSrc/helpers/form';
import { FormBody } from 'clientSrc/styles/blocks/settings';
import * as InputTypes from 'shared/constants/inputTypes';
import { FORM } from 'shared/constants/localeMessages';
import { PROFILE } from 'shared/constants/settingsDataKeys';
import USER_VISIBILITY_TYPE from 'shared/constants/userVisibilityType';

import { SimpleFloatingElement } from '../../portals';
import ProfileFormHeader from './ProfileFormHeader';
import Input from '../common/Input';

const ProfileForm = ({ data, onSubmit }) => {
  const [headerKey, setHeaderKey] = useState(0);
  const {
    submitMessage,
    isFormValid,
    isFormSending,
    inputs,
    errors,
    setFormState,
  } = useFormState(data);

  useEffect(() => {
    setHeaderKey(prevState => prevState + 1);
  }, [data]);

  const {
    [PROFILE.PHOTO]: photo,
    [PROFILE.NAME]: name,
    [PROFILE.EMAIL]: email,
    [PROFILE.CONNECTION_VISIBILITY]: visibility,
  } = data;

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={() => onSubmit(inputs, setFormState)}
        />
      )}
      <ProfileFormHeader
        key={`profileFormHeader-${headerKey}`}
        photo={photo}
        name={name}
        email={email}
        inputs={inputs}
        errors={errors}
        setFormState={setFormState}
      />

      <FormBody>
        <Input
          name={PROFILE.CONNECTION_VISIBILITY}
          type={InputTypes.SWITCH}
          label={FORM.USER_VISIBILITY}
          values={[USER_VISIBILITY_TYPE.FOF, USER_VISIBILITY_TYPE.ALL]}
          placeholder={visibility}
          updateInput={useUpdateHandler(PROFILE.CONNECTION_VISIBILITY, setFormState, undefined, visibility)}
        />
      </FormBody>
    </>
  );
};

ProfileForm.propTypes = {
  data: PropTypes.shape({
    [PROFILE.PHOTO]: PropTypes.string,
    [PROFILE.NAME]: PropTypes.string,
    [PROFILE.EMAIL]: PropTypes.string,
    [PROFILE.CONNECTION_VISIBILITY]: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
