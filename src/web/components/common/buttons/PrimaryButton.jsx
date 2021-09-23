import React from 'react'
import PropTypes from 'prop-types'

import { COLORS } from 'web/constants'
import { FormButtonWrapper, FormButton } from 'web/styles/blocks/form'

import { InputHintTooltip } from '../../portals'

const PrimaryButton = ({ children, hint, onClick, margin, inline, ...props }) => (
  <FormButtonWrapper margin={margin} inline={inline}>
    {hint && <InputHintTooltip text={hint} />}
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
  hint: PropTypes.string,
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
