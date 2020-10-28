import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  InputRow, PaddedInputWrapper, SwitchInputBox, SwitchInputField,
  InputLabel, SwitchInputLabel, SwitchInputValue,
} from 'clientSrc/styles/blocks/form';

import { LocaleText } from '../../common';
import { FORM } from 'shared/constants/localeMessages';

const SwitchInput = ({ name, label, values, placeholder, updateInput }) => {
  const [selectedValue, setSelectedValue] = useState(null)

  const handleChange = value => {
   if (value === selectedValue) {
     return;
   }

    setSelectedValue(value);
    updateInput(true, value);
  };

  return (
    <InputRow>
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
      <PaddedInputWrapper>
        <SwitchInputBox>
          <SwitchInputLabel>
            {values.map(value => (
              <SwitchInputValue
                key={`${name}-${value}`}
                selected={value === (selectedValue ?? placeholder)}
                onClick={() => handleChange(value)}
              >
                {FORM[value]
                  ? <LocaleText message={FORM[value]} />
                  : value
                }
              </SwitchInputValue>
            ))}
          </SwitchInputLabel>
        </SwitchInputBox>
      </PaddedInputWrapper>
    </InputRow>
  )
}

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
  updateInput: PropTypes.func.isRequired,
};

export default SwitchInput;
