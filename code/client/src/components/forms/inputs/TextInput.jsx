import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Edit, ChevronLeft } from '@material-ui/icons';

import * as TYPES from 'shared/constants/inputTypes';
import { isInputValid } from 'shared/helpers/validation';
import {
  InputRow, TextInputField, InputWrapper, TextInputBox, TextInputLabel,
  InputPlaceholder, ToggleInputIcon, InputLabel,
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
      inputShown: !props.placeholder,
    };
  }

  handleInputChange = e => {
    this.setState({
      inputTextLength: e.target.value.length,
    });

    const { type, updateInput } = this.props;
    updateInput(isInputValid(type, e.target.value), e.target.value);
  };

  render() {
    const { name, message, label, placeholder, type, hasError } = this.props;
    const { inputTextLength, showPassword, inputActive, inputShown } = this.state;

    return (
      <InputRow>
        {inputShown && (
          <InputWrapper active={inputActive}>
            <TextInputBox htmlFor={name}>
              <TextInputLabel shrunken={inputTextLength !== 0}>
                <LocaleText message={message} />
              </TextInputLabel>
              <TextInputField
                name={this.name}
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
              hasError={hasError}
              updateInputState={this.setState.bind(this)}
              showPassword={showPassword}
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
      </InputRow>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
};

export default TextInput;
