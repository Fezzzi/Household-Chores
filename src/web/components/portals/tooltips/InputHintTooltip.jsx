import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  InputHintAnchor, InputHintIcon, InputHintWrapper, Tooltip, TooltipWrapper,
} from 'web/styles/blocks/portals'
import { InfoIcon } from 'web/styles/icons'

import { LocaleText } from '../../common'

const InputHintTooltip = ({ text }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <InputHintAnchor>
      <InputHintWrapper>
        <TooltipWrapper>
          <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <InputHintIcon><InfoIcon /></InputHintIcon>
          </span>
          {hovered && (
            <Tooltip withArrow withHover customOffsetY={-6}>
              <LocaleText message={text} />
            </Tooltip>
          )}
        </TooltipWrapper>
      </InputHintWrapper>
    </InputHintAnchor>
  )
}

InputHintTooltip.propTypes = {
  text: PropTypes.string.isRequired,
}

export default InputHintTooltip
