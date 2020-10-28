import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import * as PortalType from 'clientSrc/constants/portalType';
import {
  SimpleFloatingElementWrapper, FloatingElementIcon, FloatingElementText,
} from 'clientSrc/styles/blocks/portals';

import LocaleText from '../../common/LocaleText';

const SimpleFloatingElement = ({ message, sending, enabled, background, backgroundHovered, icon, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const floatingUIRoot = document.getElementById(PortalType.FLOATING_UI);
  return ReactDOM.createPortal((
    <SimpleFloatingElementWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      background={background}
      backgroundHovered={backgroundHovered}
      enabled={!sending && enabled}
      onClick={e => !sending && enabled && onClick(e)}
    >
      {(hovered || sending)
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
  sending: false,
  enabled: true,
  onClick: () => {},
};

SimpleFloatingElement.propTypes = {
  message: PropTypes.string.isRequired,
  background: PropTypes.string,
  backgroundHover: PropTypes.string,
  enabled: PropTypes.bool,
  sending: PropTypes.bool,
  icon: PropTypes.element,
  onClick: PropTypes.func,
};

export default SimpleFloatingElement;
