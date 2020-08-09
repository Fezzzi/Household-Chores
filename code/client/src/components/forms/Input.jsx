import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as TYPES from 'shared/constants/inputTypes';
import { isInputValid } from 'shared/helpers/validation';
import {
  InputRow, InputField, InputWrapper, InputBox, InputLabel,
} from 'clientSrc/styles/blocks/auth';

import InputSider from './InputSider';

import LocaleText from '../common/LocaleText';

const activeInputStyle = ({
  borderColor: 'var(--cBorderActive)',
});

const miniLabelStyle = ({
  WebkitTransform: 'scale(.83333) translateY(-10px)',
  transform: 'scale(.83333) translateY(-10px)',
});

const miniInputStyle = ({
  padding: '14px 0 2px 8px',
});

export class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTextLength: 0,
      showPassword: false,
      inputActive: false,
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
    const { name, message, type, hasError } = this.props;
    const { inputTextLength, showPassword, inputActive } = this.state;

    return (
      <InputRow>
        <InputWrapper style={inputActive ? activeInputStyle : {}}>
          <InputBox htmlFor={name}>
            <InputLabel style={inputTextLength === 0 ? {} : miniLabelStyle}>
              <LocaleText message={message} />
            </InputLabel>
            <InputField
              name={this.name}
              type={type === TYPES.PASSWORD && showPassword ? TYPES.TEXT : type}
              onChange={this.handleInputChange}
              onFocus={() => this.setState({ inputActive: true })}
              onBlur={() => this.setState({ inputActive: false })}
              style={inputTextLength === 0 ? {} : miniInputStyle}
              noValidate
            />
          </InputBox>
          <InputSider
            inputTextLength={inputTextLength}
            type={type}
            hasError={hasError}
            updateInputState={this.setState.bind(this)}
            showPassword={showPassword}
          />
        </InputWrapper>
      </InputRow>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
};
