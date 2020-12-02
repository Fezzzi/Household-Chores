import React from 'react'
import PropTypes from 'prop-types'

import { COLORS } from 'clientSrc/constants'
import { FormButtonWrapper, FormButton } from 'clientSrc/styles/blocks/form'

const PrimaryButton = ({ children, onClick, margin, inline, ...props }) => (
  <FormButtonWrapper margin={margin} inline={inline}>
    <FormButton onClick={onClick} {...props}>
      {children}
    </FormButton>
  </FormButtonWrapper>
)

PrimaryButton.defaultProps = {
  background: COLORS.BLUE_PRIMARY,
  backgroundHover: COLORS.BLUE_SECONDARY,
  margin: '14px 40px',
  color: '#FAFAFA',
  border: false,
  inline: false,
  disabled: false,
}

PrimaryButton.propTypes = {
  background: PropTypes.string,
  backgroundHover: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.bool,
  inline: PropTypes.bool,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
}

export default PrimaryButton
