import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../forms';

export const SettingsFormInput = ({ input: { name, dataKey, ...props }, data, updateInput, inputError, inline = false }) => (
  <Input
    name={name}
    placeholder={(dataKey && data[dataKey]) || ''}
    inline={inline}
    inputError={inputError(name)}
    updateInput={updateInput(name)}
    {...props}
  />
);

SettingsFormInput.propTypes = {
  data: PropTypes.array.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dataKey: PropTypes.string,
  }).isRequired,
  updateInput: PropTypes.func.isRequired,
  inputError: PropTypes.func.isRequired,
  inline: PropTypes.bool,
};
