import React from 'react';
import PropTypes from 'prop-types';

import {
  FormButtonWrapper, FormButton,
} from 'clientSrc/styles/blocks/auth';

export const PrimaryButton = ({ background, color, enabled, children, clickHandler }) => (
  <FormButtonWrapper>
    <FormButton background={background} color={color} disabled={!enabled} onClick={clickHandler}>
      {children}
    </FormButton>
  </FormButtonWrapper>
);

PrimaryButton.defaultProps = ({
  background: '#0095f6',
  color: '#fff',
  enabled: true,
});

PrimaryButton.propTypes = ({
  background: PropTypes.string,
  color: PropTypes.string,
  enabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  clickHandler: PropTypes.func,
});
