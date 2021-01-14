import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Tooltip, TooltipRow, TooltipAnchor } from 'clientSrc/styles/blocks/portals'
import { useScrollOffset } from 'clientSrc/helpers/dom'
import { PORTAL_TYPE } from 'clientSrc/constants'

import LocaleText from '../../common/LocaleText'

export const NestedTooltipOptions = ({ position, options, withArrow, onBlur }) => {
  const [state, setState] = useState({
    visible: null,
    position: null,
  })

  const { scrollTop, scrollLeft } = useScrollOffset()
  const showSubToolbar = useCallback(index => e => {
    if (state.visible !== index) {
      const container = e.target.closest('div')?.getBoundingClientRect()
      const position = {
        x: container?.x + scrollLeft,
        y: container?.y + scrollTop,
      }
      setState({
        visible: index,
        position,
      })
    }
  }, [scrollTop, scrollLeft])

  const thisRef = useRef(null)
  const handleBlur = useCallback(e => {
    // Styled components generate classnames uniquely for each Component, thus classname equality => same Components
    if (onBlur && (
      !e.relatedTarget
      || e.relatedTarget.className !== e.currentTarget.className
      || (e.relatedTarget.parentNode && e.relatedTarget.parentNode.nextSibling && e.relatedTarget !== e.currentTarget)
    )) {
      const blurred = onBlur(e)
      if (!blurred) {
        thisRef.current.focus()
      }
    }
  }, [thisRef])

  const nestedBlur = useCallback(e => {
    if (e.relatedTarget === thisRef.current) {
      return false
    }
    setState({ visible: null, position: null })
    return true
  }, [thisRef.current])

  const handleClick = useCallback(clickHandler => {
    setState({ visible: null, position: null })
    thisRef.current.focus()
    clickHandler()
  }, [thisRef.current])

  useEffect(() => thisRef.current && thisRef.current.focus(), [thisRef])

  const tooltipRoot = document.getElementById(PORTAL_TYPE.TOOLTIPS)
  return ReactDOM.createPortal((
    <TooltipAnchor position={position}>
      <Tooltip
        hasRows
        tabIndex={-1}
        ref={thisRef}
        onBlur={handleBlur}
      >
        {options.map(({ content, clickHandler, nestedOptions }, index) => (
          <Fragment key={`nestedTooltip-${index}`}>
            <TooltipRow
              key={`option-${index}`}
              withArrow={!!withArrow}
              clickable={!!clickHandler || (nestedOptions && state.visible !== index)}
              selected={state.visible === index}
              onClick={clickHandler
                ? () => handleClick(clickHandler)
                : (nestedOptions && showSubToolbar(index))}
            >
              {typeof content === 'string'
                ? <LocaleText message={content} />
                : content}
            </TooltipRow>
            {state.visible === index && (
              <NestedTooltipOptions
                position={state.position}
                options={nestedOptions}
                withArrow
                onBlur={nestedBlur}
              />
            )}
          </Fragment>
        ))}
      </Tooltip>
    </TooltipAnchor>
  ), tooltipRoot)
}

export const optionsShape = PropTypes.shape({
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  clickHandler: PropTypes.func,
})
optionsShape.nestedOptions = PropTypes.arrayOf(optionsShape)

NestedTooltipOptions.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(optionsShape).isRequired,
  withArrow: PropTypes.bool,
  onBlur: PropTypes.func,
}
