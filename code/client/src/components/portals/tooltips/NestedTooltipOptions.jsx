import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Tooltip, TooltipRow, TooltipAnchor } from 'clientSrc/styles/blocks/portals';
import { useElementPosition } from 'clientSrc/helpers/dom';
import * as PortalType from 'clientSrc/constants/portalType';

import LocaleText from '../../common/LocaleText';

export const NestedTooltipOptions = ({ position, options, withArrow, blurHandler }) => {
  const [state, setState] = useState({
    visible: null,
    position: null,
  });

  const showSubToolbar = index => e => {
    if (state.visible !== index) {
      setState({
        visible: index,
        position: useElementPosition(e.target.closest('div')),
      });
    }
  };

  const onBlur = e => {
    // Styled components generate classnames uniquely for each Component, thus classname equality => same Components
    if (blurHandler && (
      !e.relatedTarget
      || e.relatedTarget.className !== e.currentTarget.className
      || (e.relatedTarget.parentNode && e.relatedTarget.parentNode.nextSibling && e.relatedTarget !== e.currentTarget)
    )) {
      blurHandler();
    }
  };

  const thisRef = useRef(null);
  useEffect(() => thisRef.current && thisRef.current.focus(), [thisRef]);

  const tooltipRoot = document.getElementById(PortalType.TOOLTIPS);
  return ReactDOM.createPortal((
    <TooltipAnchor position={position}>
      <Tooltip
        hasRows
        tabIndex={-1}
        ref={thisRef}
        onBlur={onBlur}
      >
        {options.map(({ content, clickHandler, nestedOptions }, index) => (
          <Fragment key={`nestedTooltip-${index}`}>
            <TooltipRow
              key={`option-${index}`}
              withArrow={!!withArrow}
              clickable={!!clickHandler || (nestedOptions && state.visible !== index)}
              selected={state.visible === index}
              onClick={clickHandler ?? (nestedOptions && showSubToolbar(index))}
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
                blurHandler={() => setState({ visible: null, position: null })}
              />
            )}
          </Fragment>
        ))}
      </Tooltip>
    </TooltipAnchor>
  ), tooltipRoot);
};

export const optionsShape = PropTypes.shape({
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  clickHandler: PropTypes.func,
});
optionsShape.nestedOptions = PropTypes.arrayOf(optionsShape);

NestedTooltipOptions.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(optionsShape).isRequired,
  withArrow: PropTypes.bool,
  blurHandler: PropTypes.func,
};
