import React from 'react';
import PropTypes from 'prop-types';

import {
  InputRow, InputLabel, FixedInputRow,
} from 'clientSrc/styles/blocks/form';

import LocaleText from '../../common/LocaleText';

const getInputBody = (label, body) => (
  <>
    {label && (
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
    )}
    {body}
  </>
);

const CustomInput = ({ label, body, fixed, half }) => (
  <InputRow>
    {fixed
      ? <FixedInputRow half={half}>{getInputBody(label, body)}</FixedInputRow>
      : getInputBody(label, body)}
  </InputRow>
);

CustomInput.propTypes = {
  label: PropTypes.string,
  body: PropTypes.element.isRequired,
  fixed: PropTypes.bool,
  half: PropTypes.bool,
};

export default CustomInput;
