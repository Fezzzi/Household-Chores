import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as TYPES from 'clientSrc/constants/inputTypes';
import {
  InputRow, InputField, InputWrapper, InputBox, InputLabel,
  InputSider, ShowPassWrapper, ShowPassButton,
} from 'clientSrc/styles/blocks/auth';

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

  render() {
    const { name, label, type } = this.props;
    const { inputTextLength, showPassword, inputActive } = this.state;

    return (
      <InputRow>
        <InputWrapper style={inputActive ? activeInputStyle : {}}>
          <InputBox htmlFor={name}>
            <InputLabel style={inputTextLength === 0 ? {} : miniLabelStyle}>{label}</InputLabel>
            <InputField
              name={this.name}
              type={type === TYPES.PASSWORD && showPassword ? TYPES.TEXT : type}
              onChange={e => this.setState({ inputTextLength: e.target.value.length })}
              onFocus={() => this.setState({ inputActive: true })}
              onBlur={() => this.setState({ inputActive: false })}
              style={inputTextLength === 0 ? {} : miniInputStyle}
            />
          </InputBox>
          <InputSider>
            {type === TYPES.PASSWORD && inputTextLength > 0
              ? (
                <ShowPassWrapper>
                  <ShowPassButton onClick={() => this.setState({ showPassword: !showPassword })}>
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
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
