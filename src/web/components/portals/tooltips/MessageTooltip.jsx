import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { useScrollOffset } from 'web/helpers/dom'
import { PORTAL_TYPE } from 'web/constants'
import { Tooltip, TooltipAnchor, TooltipWrapper } from 'web/styles/blocks/portals'

import { LocaleText } from '../../common/LocaleText'

const MessageTooltip = ({
  icon,
  text,
  customLineHeight,
  customOffsetY,
  customOffsetX,
  maxWidth,
  centered,
  scrollRoot = 'pageWrapper',
  type = PORTAL_TYPE.TOOLTIPS,
}) => {
  const [hovered, setHovered] = useState(false)

  const tooltipRoot = document.getElementById(type)
  const { scrollTop, scrollLeft } = useScrollOffset(scrollRoot)

  const anchorRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    if (tooltipRef.current && centered) {
      tooltipRef.current.style.top = `${-tooltipRef.current.clientHeight / 2 + customOffsetY}px`
    }
  }, [tooltipRef.current, customOffsetY])

  const position = useMemo(() => {
    const container = anchorRef.current?.getBoundingClientRect()
    return {
      x: container?.x + scrollLeft + customOffsetX,
      y: container?.y + scrollTop,
    }
  }, [anchorRef.current, scrollTop, scrollLeft])

  const portal = ReactDOM.createPortal((
    <TooltipAnchor position={position} hidden={!hovered}>
      <Tooltip
        ref={el => tooltipRef.current = el}
        customLineHeight={customLineHeight ?? '20px'}
        customHeight="fit-content"
        customOffsetY={customOffsetY}
        maxWidth={maxWidth ?? '400px'}
        withHover
        withArrow
        arrowTop={!centered}
        tabIndex={-1}
      >
        <LocaleText message={text} />
      </Tooltip>
    </TooltipAnchor>
  ), tooltipRoot)

  return (
    <TooltipWrapper ref={anchorRef}>
      <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {icon}
      </span>
      {portal}
    </TooltipWrapper>
  )
}

MessageTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  customLineHeight: PropTypes.number,
  customOffsetY: PropTypes.number,
  customOffsetX: PropTypes.number,
  maxWidth: PropTypes.number,
  centered: PropTypes.bool,
  scrollRoot: PropTypes.string,
  type: PropTypes.string,
}

export default MessageTooltip
