import React from 'react';
import PropTypes from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import { TextInput, PhotoInput, SwitchInput, CustomInput } from '../inputs';

const Input = ({ type, ...props }) => {
  switch (type) {
    case InputTypes.PHOTO:
      return <PhotoInput {...props} />;
    case InputTypes.SWITCH:
      return <SwitchInput {...props} />;
    case InputTypes.CUSTOM:
      return <CustomInput {...props} />;
    default:
      return <TextInput type={type} {...props} />;
  }
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputError: PropTypes.string,
  updateInput: PropTypes.func,
};

export default Input;
