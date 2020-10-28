import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Edit, ChevronLeft } from '@material-ui/icons';

import {
  InputRow, TextInputField, InputWrapper, TextInputBox, TextInputLabel, InputPlaceholder,
  ToggleInputIcon, InputLabel, FixedInputBlock, ErrorSpan, ShowPassWrapper,
  ShowPassButton, InputSiderWrapper,
} from 'clientSrc/styles/blocks/form';
import { InfoTooltip } from 'clientSrc/components/portals';
import * as InputTypes from 'shared/constants/inputTypes';
import { COMMON } from 'shared/constants/localeMessages';
import { isInputValid } from 'shared/helpers/validation';

import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

import LocaleText from '../../common/LocaleText';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTextLength: 0,
      showPassword: false,
      inputActive: false,
      inputShown: null,
    };
  }

  handleInputChange = e => {
    this.setState({
      inputTextLength: e.target.value.length,
    });

    const { type, updateInput } = this.props;
    const { valid, message } = isInputValid(type, e.target.value);
    updateInput(valid, e.target.value, message);
  };

  getInputBody() {
    const { name, message, label, placeholder, type, reference, inputError } = this.props;
    const { inputTextLength, showPassword, inputActive, inputShown } = this.state;

    const showPassButton = type === InputTypes.PASSWORD && inputTextLength > 0;
    const showError = !inputActive && !!inputError;

    return (
      <>
        {(inputShown === true || (inputShown === null && !placeholder)) && (
          <InputWrapper active={inputActive}>
            <TextInputBox htmlFor={name}>
              <TextInputLabel shrunken={inputTextLength !== 0}>
                <LocaleText message={message} />
              </TextInputLabel>
              <TextInputField
                name={name}
                type={type === InputTypes.PASSWORD && showPassword ? InputTypes.TEXT : type}
                ref={reference}
                onChange={this.handleInputChange}
                onFocus={() => this.setState({ inputActive: true })}
                onBlur={() => this.setState({ inputActive: false })}
                shrunken={inputTextLength !== 0}
                noValidate
              />
            </TextInputBox>
            {(showPassButton || showError) && (
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
                      this.setState({ showPassword: !showPassword });
                    }}
                    >
                      <LocaleText message={showPassword ? COMMON.HIDE : COMMON.SHOW} />
                    </ShowPassButton>
                  </ShowPassWrapper>
                )}
              </InputSiderWrapper>
            )}
          </InputWrapper>
        )}
        {placeholder && (
          <>
            {!inputShown && label && (
              <InputLabel>
                <LocaleText message={label} />
              </InputLabel>
            )}
            <ToggleInputIcon>
              {inputShown
                ? <ChevronLeft onClick={() => this.setState({ inputShown: false })} />
                : <Edit onClick={() => this.setState({ inputShown: true })} />}
            </ToggleInputIcon>
            <InputPlaceholder>
              {placeholder}
            </InputPlaceholder>
          </>
        )}
      </>
    );
  }

  render() {
    const { inline, fixedPadding, fixedProps } = this.props;
    const body = this.getInputBody();

    return inline
      ? (
        <FixedInputBlock {...fixedProps}>
          {body}
        </FixedInputBlock>
      ) : (
        <InputRow fixedPadding={fixedPadding}>
          {body}
        </InputRow>
      );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  label: PropTypes.string,
  inline: PropTypes.bool,
  fixedPadding: PropTypes.bool,
  fixedProps: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  reference: PropTypes.object,
  inputError: PropTypes.string,
  updateInput: PropTypes.func,
};

export default TextInput;
