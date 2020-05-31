import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as TYPES from 'clientSrc/constants/inputTypes';
import { isInputValid } from 'clientSrc/helpers/validations';
import {
  InputRow, InputField, InputWrapper, InputBox, InputLabel,
  InputSider, ShowPassWrapper, ShowPassButton, ErrorSpan,
} from 'clientSrc/styles/blocks/auth';

import InputErrorIcon from '~/static/icons/input-error-icon.svgr';

const activeInputStyle = ({
  borderColor: '#a8a8a8',
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
  }

  render() {
    const { name, label, type, hasError } = this.props;
    const { inputTextLength, showPassword, inputActive } = this.state;

    return (
      <InputRow>
        <InputWrapper style={inputActive ? activeInputStyle : {}}>
          <InputBox htmlFor={name}>
            <InputLabel style={inputTextLength === 0 ? {} : miniLabelStyle}>{label}</InputLabel>
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
                    this.setState({ showPassword: !showPassword });
                  }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </ShowPassButton>
                </ShowPassWrapper>
              )
              : ''}
          </InputSider>
        </InputWrapper>
      </InputRow>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
  updateInput: PropTypes.func,
};
