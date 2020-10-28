import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TooltipWrapper, OptionsTooltipIcon } from 'clientSrc/styles/blocks/portals';

import { useElementPosition } from 'clientSrc/helpers/dom';
import NestedTooltipOptions from './NestedTooltipOptions';

export const OptionsTooltip = ({ icon, options }) => {
  const [state, setState] = useState({
    visible: false,
    position: null,
  });

  const showToolbar = e => {
    if (!state.visible) {
      setState({
        visible: true,
        position: useElementPosition(e.target.closest('svg')),
      });
    }
  };

  return (
    <TooltipWrapper>
      <OptionsTooltipIcon active={state.visible} onClick={showToolbar}>
        {icon}
      </OptionsTooltipIcon>
      {state.visible && (
        <NestedTooltipOptions
          position={state.position}
          options={options}
          withArrow={false}
          blurHandler={() => setState({ visible: false, position: null })}
        />
      )}
    </TooltipWrapper>
  );
};

export const optionsShape = PropTypes.shape({
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  clickHandler: PropTypes.func,
});
optionsShape.nestedOptions = PropTypes.arrayOf(optionsShape);

OptionsTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(optionsShape).isRequired,
};
