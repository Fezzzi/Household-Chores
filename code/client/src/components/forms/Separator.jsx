import React from 'react';
import { PropTypes } from 'prop-types';

import { SeparatorWrapper, SeparatorLine, SeparatorText } from 'clientSrc/styles/blocks/auth';

export const Separator = ({ text }) => (
  <SeparatorWrapper>
    <SeparatorLine />
    <SeparatorText>{text}</SeparatorText>
    <SeparatorLine />
  </SeparatorWrapper>
);

Separator.propTypes = ({
  text: PropTypes.string,
});
