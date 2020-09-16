import React from 'react';
import PropTypes from 'prop-types';

import { FormButtonWrapper, FormButton } from 'clientSrc/styles/blocks/form';

export const PrimaryButton = ({ children, clickHandler, margin, ...props }) => (
  <FormButtonWrapper margin={margin}>
    <FormButton onClick={clickHandler} {...props}>
      {children}
    </FormButton>
  </FormButtonWrapper>
);

PrimaryButton.defaultProps = ({
  background: 'var(--cBluePrimary)',
  backgroundHover: 'var(--cBlueSecondary)',
  margin: '14px 40px',
  color: '#FAFAFA',
  border: false,
  disabled: false,
});

PrimaryButton.propTypes = ({
  background: PropTypes.string,
  backgroundHover: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  clickHandler: PropTypes.func,
});
