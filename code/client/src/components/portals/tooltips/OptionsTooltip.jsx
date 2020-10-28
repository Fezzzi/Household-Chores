import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TooltipWrapper, OptionsTooltipIcon } from 'clientSrc/styles/blocks/portals';

import { useElementPosition } from 'clientSrc/helpers/dom';
import { NestedTooltipOptions, optionsShape } from './NestedTooltipOptions';

const OptionsTooltip = ({ icon, options }) => {
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

OptionsTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  options: PropTypes.arrayOf(optionsShape).isRequired,
};

export default OptionsTooltip;
