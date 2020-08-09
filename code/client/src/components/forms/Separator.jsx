import React from 'react';
import { PropTypes } from 'prop-types';

import { SeparatorWrapper, SeparatorLine, SeparatorText } from 'clientSrc/styles/blocks/auth';
import LocaleText from '../common/LocaleText';

export const Separator = ({ message }) => (
  <SeparatorWrapper>
    <SeparatorLine />
    <SeparatorText>
      <LocaleText message={message} />
    </SeparatorText>
    <SeparatorLine />
  </SeparatorWrapper>
);

Separator.propTypes = ({
  message: PropTypes.string,
});
