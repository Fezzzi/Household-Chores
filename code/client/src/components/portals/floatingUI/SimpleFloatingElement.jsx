import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as PortalType from 'clientSrc/constants/portalType';
import {
  SimpleFloatingElementWrapper,
  FloatingElementIcon, FloatingElementText,
} from 'clientSrc/styles/blocks/portals';

import { LocaleText } from '../../common';

const SimpleFloatingElement = ({ message, enabled, background, backgroundHovered, icon, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const floatingUIRoot = document.getElementById(PortalType.FLOATING_UI);
  return ReactDOM.createPortal((
    <SimpleFloatingElementWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      background={background}
      backgroundHovered={backgroundHovered}
      enabled={enabled}
      onClick={e => enabled && onClick(e)}
    >
      {(hovered || !enabled)
        ? icon
          ? (
            <>
              {icon && <FloatingElementIcon>{icon}</FloatingElementIcon>}
              <FloatingElementText>
                <LocaleText message={message} />
              </FloatingElementText>
            </>
          ) : (
            <FloatingElementText>
              <LocaleText message={message} />
            </FloatingElementText>
          )
        : <FloatingElementIcon>{icon}</FloatingElementIcon>}
    </SimpleFloatingElementWrapper>
  ), floatingUIRoot);
};

SimpleFloatingElement.defaultProps = {
  background: 'var(--cBluePrimary)',
  backgroundHover: 'var(--cBlueSecondary)',
  enabled: true,
  onClick: () => {},
};

SimpleFloatingElement.propTypes = {
  message: PropTypes.string.isRequired,
  background: PropTypes.string,
  backgroundHover: PropTypes.string,
  enabled: PropTypes.bool,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

export default SimpleFloatingElement;