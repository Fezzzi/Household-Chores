import React from 'react';
import PropTypes from 'prop-types';

import { COMMON } from 'shared/constants/localeMessages';
import * as TYPES from 'shared/constants/inputTypes';
import {
  InputSider, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/auth';
import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

const Sider = ({ inputTextLength, type, hasError, showPassword, updateInputState }) => (
  <InputSider>
    {hasError
      ? (
        <ErrorSpan>
          <InputErrorIcon />
        </ErrorSpan>
      )
      : ''}
    {type === TYPES.PASSWORD && inputTextLength > 0
      ? (
        <ShowPassWrapper>
          <ShowPassButton onClick={e => {
            e.preventDefault();
            updateInputState({ showPassword: !showPassword });
          }}
          >
            {showPassword ? COMMON.HIDE : COMMON.SHOW}
          </ShowPassButton>
        </ShowPassWrapper>
      )
      : ''}
  </InputSider>
);

Sider.propTypes = {
  type: PropTypes.string.isRequired,
  inputTextLength: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
  updateInputState: PropTypes.func.isRequired,
  showPassword: PropTypes.bool,
};

export default Sider;
