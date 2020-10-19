import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { HoverTooltip, TooltipWrapper } from 'clientSrc/styles/blocks/portals';
import LocaleText from 'clientSrc/components/common/LocaleText';

const InfoTooltip = ({ icon, text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TooltipWrapper>
      <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {icon}
      </span>
      {hovered && (
        <HoverTooltip withArrow>
          <LocaleText message={text} />
        </HoverTooltip>
      )}
    </TooltipWrapper>
  );
};

InfoTooltip.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};

export default InfoTooltip;
