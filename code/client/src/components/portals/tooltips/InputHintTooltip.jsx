import React, { useState } from 'react'
import { Info } from '@material-ui/icons'
import PropTypes from 'prop-types'

import {
  InputHintAnchor, InputHintIcon, InputHintWrapper, Tooltip, TooltipWrapper,
} from 'clientSrc/styles/blocks/portals'

import LocaleText from '../../common/LocaleText'

const InputHintTooltip = ({ text }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <InputHintAnchor>
      <InputHintWrapper>
        <TooltipWrapper>
          <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <InputHintIcon><Info /></InputHintIcon>
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
