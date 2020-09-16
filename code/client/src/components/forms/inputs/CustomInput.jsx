import React from 'react';
import PropTypes from 'prop-types';

import {
  InputRow, InputLabel, FixedInputBlock,
} from 'clientSrc/styles/blocks/form';

import LocaleText from '../../common/LocaleText';

const getBody = (label, body) => (
  <>
    {label && (
      <InputLabel>
        <LocaleText message={label} />
      </InputLabel>
    )}
    {body}
  </>
);

const CustomInput = ({ inline, label, body, fixedProps }) => (
  <>
    {inline ? (
      <FixedInputBlock {...fixedProps}>
        {getBody(label, body)}
      </FixedInputBlock>
    ) : (
      <InputRow>
        {getBody(label, body)}
      </InputRow>
    )}
  </>
);

CustomInput.propTypes = {
  label: PropTypes.string,
  body: PropTypes.element.isRequired,
  inline: PropTypes.bool,
  fixedProps: PropTypes.object,
};

export default CustomInput;
