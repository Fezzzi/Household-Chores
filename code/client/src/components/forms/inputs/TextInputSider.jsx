import React from 'react';
import PropTypes from 'prop-types';

import { COMMON } from 'shared/constants/localeMessages';
import * as InputTypes from 'shared/constants/inputTypes';
import {
  TextInputSider, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/form';
import { InfoTooltip, LocaleText } from 'clientSrc/components/common';
import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

const Sider = ({ inputTextLength, type, inputError, showPassword, updateInputState, inputActive }) => (
  <TextInputSider>
    {!inputActive && inputError
      ? (
        <ErrorSpan>
          <InfoTooltip icon={<InputErrorIcon />} text={inputError} />
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
  inputError: PropTypes.string,
  updateInputState: PropTypes.func.isRequired,
  showPassword: PropTypes.bool,
  inputActive: PropTypes.bool,
};

export default Sider;
