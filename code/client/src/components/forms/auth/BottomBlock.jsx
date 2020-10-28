import React from 'react';
import PropTypes from 'prop-types';

import {
  BottomMessageWrapper, BottomMessageBlock, BottomMessageLink,
} from 'clientSrc/styles/blocks/auth';

import LocaleText from '../../common/LocaleText';

const BottomBlock = ({ message, linkMessage, onClick }) => (
  <BottomMessageWrapper>
    <BottomMessageBlock>
      <LocaleText message={message} />
      <BottomMessageLink onClick={onClick}>
        &nbsp;<LocaleText message={linkMessage} />
      </BottomMessageLink>
    </BottomMessageBlock>
  </BottomMessageWrapper>
);

BottomBlock.propTypes = {
  message: PropTypes.string.isRequired,
  linkMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BottomBlock;
