import React from 'react';
import PropTypes from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import { TextInput, PhotoInput, BoolInput, SwitchInput } from '../inputs';

const Input = ({ type, ...props }) => {
  switch (type) {
    case InputTypes.PHOTO:
      return <PhotoInput {...props} />;
    case InputTypes.BOOL:
      return <BoolInput {...props} />;
    case InputTypes.SWITCH:
      return <SwitchInput {...props} />;
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
