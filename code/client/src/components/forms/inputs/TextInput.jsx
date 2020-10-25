import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Edit, ChevronLeft } from '@material-ui/icons';

import * as TYPES from 'shared/constants/inputTypes';
import { isInputValid } from 'shared/helpers/validation';
import {
  InputRow, TextInputField, InputWrapper, TextInputBox, TextInputLabel,
  InputPlaceholder, ToggleInputIcon, InputLabel, FixedInputBlock,
} from 'clientSrc/styles/blocks/form';

import TextInputSider from './TextInputSider';
import LocaleText from '../../common/LocaleText';
import * as InputTypes from 'shared/constants/inputTypes';

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

    const showPassButton= type === InputTypes.PASSWORD && inputTextLength > 0
    const showError = !inputActive && inputError

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
                type={type === TYPES.PASSWORD && showPassword ? TYPES.TEXT : type}
                ref={reference}
                onChange={this.handleInputChange}
                onFocus={() => this.setState({ inputActive: true })}
                onBlur={() => this.setState({ inputActive: false })}
                shrunken={inputTextLength !== 0}
                noValidate
              />
            </TextInputBox>
            {(showPassButton || showError) && (
              <TextInputSider
                showPassButton={showPassButton}
                showError={showError}
                inputError={inputError}
                updateInputState={this.setState.bind(this)}
                passwordVisible={showPassword}
              />
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
