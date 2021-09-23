import React, { useState, createElement } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { COLORS, PORTAL_TYPE } from 'web/constants'
import {
  SimpleFloatingElementWrapper, FloatingElementIcon, FloatingElementText,
} from 'web/styles/blocks/portals'

import LocaleText from '../../common/LocaleText'

const SimpleFloatingElement = ({ message, sending, enabled, background, backgroundHovered, icon, onClick }) => {
  const [hovered, setHovered] = useState(false)

  const floatingUIRoot = document.getElementById(PORTAL_TYPE.FLOATING_UI)
  return ReactDOM.createPortal((
    <SimpleFloatingElementWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      background={background}
      backgroundHovered={backgroundHovered}
      enabled={!sending && enabled}
      onClick={e => {
        if (sending || !enabled) {
          return
        }
        onClick(e)
      }}
    >
      {(hovered || sending)
        ? icon
          ? (
            <>
              {icon && <FloatingElementIcon>{createElement(icon)}</FloatingElementIcon>}
              <FloatingElementText>
                <LocaleText message={message} />
              </FloatingElementText>
            </>
          ) : (
            <FloatingElementText>
              <LocaleText message={message} />
            </FloatingElementText>
          )
        : <FloatingElementIcon>{createElement(icon)}</FloatingElementIcon>}
    </SimpleFloatingElementWrapper>
  ), floatingUIRoot)
}

SimpleFloatingElement.defaultProps = {
  background: COLORS.BLUE_PRIMARY,
  backgroundHovered: COLORS.BLUE_SECONDARY,
  sending: false,
  enabled: true,
  onClick: () => {},
}

SimpleFloatingElement.propTypes = {
  message: PropTypes.string.isRequired,
  background: PropTypes.string,
  backgroundHovered: PropTypes.string,
  enabled: PropTypes.bool,
  sending: PropTypes.bool,
  icon: PropTypes.elementType,
  onClick: PropTypes.func,
}

export default SimpleFloatingElement
