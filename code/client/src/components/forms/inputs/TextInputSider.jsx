import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { COMMON } from 'shared/constants/localeMessages';
import * as InputTypes from 'shared/constants/inputTypes';
import {
  TextInputSider, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/form';
import { HoverTooltip } from 'clientSrc/styles/blocks/common';
import LocaleText from 'clientSrc/components/common/LocaleText';
import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

const Sider = ({ inputTextLength, type, inputError, showPassword, updateInputState, inputActive }) => {
  const [errorHovered, setErrorHovered] = useState(false);

  return (
    <TextInputSider>
      {!inputActive && inputError !== ''
        ? (
          <ErrorSpan>
            <InputErrorIcon onMouseEnter={() => setErrorHovered(true)} onMouseLeave={() => setErrorHovered(false)} />
            {errorHovered && <HoverTooltip><LocaleText message={inputError} /></HoverTooltip>}
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
};

Sider.propTypes = {
  type: PropTypes.string.isRequired,
  inputTextLength: PropTypes.number.isRequired,
  inputError: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
  showPassword: PropTypes.bool,
  inputActive: PropTypes.bool,
};

export default Sider;
