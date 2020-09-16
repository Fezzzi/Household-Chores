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
    const { name, message, label, placeholder, type, inputError } = this.props;
    const { inputTextLength, showPassword, inputActive, inputShown } = this.state;

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
                onChange={this.handleInputChange}
                onFocus={() => this.setState({ inputActive: true })}
                onBlur={() => this.setState({ inputActive: false })}
                shrunken={inputTextLength !== 0}
                noValidate
              />
            </TextInputBox>
            <TextInputSider
              inputTextLength={inputTextLength}
              type={type}
              inputError={inputError}
              updateInputState={this.setState.bind(this)}
              showPassword={showPassword}
              inputActive={inputActive}
            />
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
    const { inline, fixedProps } = this.props;
    const body = this.getInputBody();

    return inline
      ? (
        <FixedInputBlock {...fixedProps}>
          {body}
        </FixedInputBlock>
      ) : (
        <InputRow>
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
  fixedProps: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  inputError: PropTypes.string.isRequired,
  updateInput: PropTypes.func,
};

export default TextInput;
