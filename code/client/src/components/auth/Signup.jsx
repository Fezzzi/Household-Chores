import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'clientSrc/constants/inputTypes';
import * as AuthActions from 'clientSrc/actions/authActions';
import { FacebookIconSpan, MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';

import { Separator } from './Separator';
import { Input, PrimaryButton } from '../forms';

const inputsConfig = [
  { name: 'email', label: 'Email', type: InputTypes.EMAIL },
  { name: 'nickname', label: 'Nickname', type: InputTypes.TEXT },
  { name: 'password', label: 'Password', type: InputTypes.PASSWORD },
];

export class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      inputs: Object.fromEntries(inputsConfig.map(input =>
        [input.name, { valid: false, value: '' }]
      )),
      errors: {},
    };
  }

  render() {
    const { signUp } = this.props;
    const { isFormValid, errors, inputs } = this.state;

    return (
      <form method="post">
        <PrimaryButton>
          <>
            <FacebookIconSpan />
            Sign up with Facebook
          </>
        </PrimaryButton>
        <PrimaryButton background="#ea4335">
          Sign up with Google
        </PrimaryButton>
        <Separator text="or" />
        {inputsConfig.map(input => (
          <Input
            name={input.name}
            key={input.name}
            label={input.label}
            type={input.type}
            hasError={!!errors[input.name]}
            updateInput={updateInput(this, input.name)}
          />
        ))}
        <PrimaryButton enabled={isFormValid} clickHandler={handlerWrapper(signUp, inputs)}>
          Sign up
        </PrimaryButton>
        <MessageBlock>
          By signing up, you agree to our &nbsp;
          <MessageBlockLink target="_blank" href="">Terms and Conditions</MessageBlockLink>
          &nbsp;.
        </MessageBlock>
      </form>
    );
  }
}

SignupComponent.propTypes = ({
  signUp: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values)),
});

export const Signup = connect(null, mapDispatchToProps)(SignupComponent);
