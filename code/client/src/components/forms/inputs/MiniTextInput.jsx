import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextInputBox,
  TextInputField,
  TextInputLabel,
} from 'clientSrc/styles/blocks/form';
import { MiniInputWrapper } from 'clientSrc/styles/blocks/common';
import { LocaleText } from 'clientSrc/components/common';
import * as TYPES from 'shared/constants/inputTypes';


const MiniTextInput = ({ name, reference, message, handleChange }) => {
  const [inputTextLength, setInputTextLength] = useState(0);
  const [inputActive, setInputActive] = useState(false);

  const handleInputChange = e => {
    setInputTextLength(e.target.value.length);
    handleChange(e.target.value);
  };

  return (
    <MiniInputWrapper active={inputActive}>
      <TextInputBox htmlFor={name} lineHeight={26}>
        <TextInputLabel shrunken={inputTextLength !== 0} lineHeight={26} miniInput>
          <LocaleText message={message} />
        </TextInputLabel>
        <TextInputField
          lineHeight={26}
          name={name}
          type={TYPES.TEXT}
          ref={reference}
          onChange={handleInputChange}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          shrunken={inputTextLength !== 0}
          noValidate
          miniInput
        />
      </TextInputBox>
    </MiniInputWrapper>
  );
};

MiniTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  reference: PropTypes.object,
};

export default MiniTextInput;
