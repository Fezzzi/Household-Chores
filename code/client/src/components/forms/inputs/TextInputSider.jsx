import React from 'react';
import PropTypes from 'prop-types';

import { COMMON } from 'shared/constants/localeMessages';
import {
  InputSiderWrapper, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/form';
import { InfoTooltip, LocaleText } from 'clientSrc/components/common';
import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

const TextInputSider = ({ showPassButton, showError, inputError, passwordVisible, updateInputState }) => (
  <InputSiderWrapper>
    {showError && (
      <ErrorSpan>
        <InfoTooltip icon={<InputErrorIcon />} text={inputError} />
      </ErrorSpan>
    )}
    {showPassButton && (
      <ShowPassWrapper>
        <ShowPassButton onClick={e => {
          e.preventDefault();
          updateInputState({ showPassword: !passwordVisible });
        }}
        >
          <LocaleText message={passwordVisible ? COMMON.HIDE : COMMON.SHOW} />
        </ShowPassButton>
      </ShowPassWrapper>
    )}
  </InputSiderWrapper>
);

TextInputSider.propTypes = {
  showPassButton: PropTypes.bool.isRequired,
  showError: PropTypes.bool.isRequired,
  inputError: PropTypes.string,
  updateInputState: PropTypes.func.isRequired,
  passwordVisible: PropTypes.bool,
};

export default TextInputSider;
