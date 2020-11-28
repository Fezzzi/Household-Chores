import React from 'react'
import PropTypes from 'prop-types'

import { MiniFormButtonWrapper, MiniFormButton } from 'clientSrc/styles/blocks/form'

const MiniButton = ({ children, clickHandler, margin, inline, ...props }) => (
  <MiniFormButtonWrapper margin={margin} inline={inline}>
    <MiniFormButton onClick={clickHandler} {...props}>
      {children}
    </MiniFormButton>
  </MiniFormButtonWrapper>
)

MiniButton.defaultProps = {
  background: 'var(--cBluePrimary)',
  backgroundHover: 'var(--cBlueSecondary)',
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
  clickHandler: PropTypes.func,
}

export default MiniButton
