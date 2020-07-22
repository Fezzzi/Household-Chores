import React from 'react';
import PropTypes from 'prop-types';

import {
  BottomMessageWrapper, BottomMessageBlock, BottomMessageLink,
} from 'clientSrc/styles/blocks/auth';

export const BottomBlock = ({ message, linkText, onClick }) => (
  <BottomMessageWrapper>
    <BottomMessageBlock>
      {message}
      <BottomMessageLink onClick={onClick}>{linkText}</BottomMessageLink>
    </BottomMessageBlock>
  </BottomMessageWrapper>
);

BottomBlock.propTypes = ({
  message: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
});
