import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { TooltipWrapper, OptionsTooltipIcon } from 'web/styles/blocks/portals'
import { useScrollOffset } from 'web/helpers/dom'

import { NestedTooltipOptions, optionsShape } from './NestedTooltipOptions'

const OptionsTooltip = ({ icon, options }) => {
  const [state, setState] = useState({
    visible: false,
    position: null,
  })

  const { visible, position } = state
  const { scrollTop, scrollLeft } = useScrollOffset()
  const showToolbar = useCallback(e => {
    if (!visible) {
      const container = e.target.closest('svg')?.getBoundingClientRect()
      const position = {
        x: container?.x + scrollLeft,
        y: container?.y + scrollTop,
      }
      setState({
        visible: true,
        position,
      })
    }
  }, [visible, scrollTop, scrollLeft])

  const tooltipIconRef = useRef(null)
  const handleBlur = useCallback(e => {
    if (e.relatedTarget === tooltipIconRef.current) {
      return false
    }
    setState({ visible: false, position: null })
    return true
  }, [tooltipIconRef.current])

  return (
    <TooltipWrapper>
      <OptionsTooltipIcon active={visible} onClick={showToolbar} tabIndex={-1} ref={tooltipIconRef}>
        {icon}
      </OptionsTooltipIcon>
      {visible && (
        <NestedTooltipOptions
          position={position}
          options={options}
          withArrow={false}
          onBlur={handleBlur}
        />
      )}
    </TooltipWrapper>
  )
}

OptionsTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(optionsShape).isRequired,
}

export default OptionsTooltip
