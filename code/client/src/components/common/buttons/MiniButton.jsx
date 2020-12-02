import React from 'react'
import PropTypes from 'prop-types'

import { COLORS } from 'clientSrc/constants'
import { MiniFormButtonWrapper, MiniFormButton } from 'clientSrc/styles/blocks/form'

const MiniButton = ({ children, onClick, margin, inline, ...props }) => (
  <MiniFormButtonWrapper margin={margin} inline={inline}>
    <MiniFormButton onClick={onClick} {...props}>
      {children}
    </MiniFormButton>
  </MiniFormButtonWrapper>
)

MiniButton.defaultProps = {
  background: COLORS.BLUE_PRIMARY,
  backgroundHover: COLORS.BLUE_SECONDARY,
  margin: 0,
  color: '#FAFAFA',
  border: false,
  inline: false,
  disabled: false,
}

MiniButton.propTypes = {
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

export default MiniButton
