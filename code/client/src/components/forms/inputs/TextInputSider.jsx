import React from 'react';
import PropTypes from 'prop-types';

import InputErrorIcon from '~/static/icons/input-error-icon.svgr';
import { COMMON } from 'shared/constants/localeMessages';
import * as InputTypes from 'shared/constants/inputTypes';
import {
  TextInputSider, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/form';
import LocaleText from 'clientSrc/components/common/LocaleText';

const Sider = ({ inputTextLength, type, hasError, showPassword, updateInputState }) => (
  <TextInputSider>
    {hasError
      ? (
        <ErrorSpan>
          <InputErrorIcon />
        </ErrorSpan>
      )
      : ''}
    {type === InputTypes.PASSWORD && inputTextLength > 0
      ? (
        <ShowPassWrapper>
          <ShowPassButton onClick={e => {
            e.preventDefault();
            updateInputState({ showPassword: !showPassword });
          }}
          >
            <LocaleText message={showPassword ? COMMON.HIDE : COMMON.SHOW} />
          </ShowPassButton>
        </ShowPassWrapper>
      )
      : ''}
  </TextInputSider>
);

Sider.propTypes = {
  type: PropTypes.string.isRequired,
  inputTextLength: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
  updateInputState: PropTypes.func.isRequired,
  showPassword: PropTypes.bool,
};

export default Sider;
