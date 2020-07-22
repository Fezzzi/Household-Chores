import React from 'react';
import PropTypes from 'prop-types';

import { FormButtonWrapper, FormButton } from 'clientSrc/styles/blocks/auth';

export const PrimaryButton = ({ background, color, border, disabled, children, clickHandler }) => (
  <FormButtonWrapper>
    <FormButton background={background} color={color} border={border} disabled={disabled} onClick={clickHandler}>
      {children}
    </FormButton>
  </FormButtonWrapper>
);

PrimaryButton.defaultProps = ({
  background: '#0095f6',
  color: '#fff',
  border: false,
  disabled: false,
});

PrimaryButton.propTypes = ({
  background: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  clickHandler: PropTypes.func,
});
