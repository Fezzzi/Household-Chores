import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Tooltip, TooltipWrapper } from 'web/styles/blocks/portals'

import { LocaleText } from '../../common/LocaleText'

const InfoTooltip = ({ icon, text, customHeight, customOffsetY }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <TooltipWrapper>
      <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {icon}
      </span>
      {hovered && (
        <Tooltip
          customHeight={`${customHeight}px`}
          customLineHeight={`${customHeight - 2}px`}
          customOffsetY={customOffsetY}
          withArrow
          withHover
        >
          <LocaleText message={text} />
        </Tooltip>
      )}
    </TooltipWrapper>
  )
}

InfoTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  customHeight: PropTypes.number,
  customOffsetY: PropTypes.number,
}

export default InfoTooltip
