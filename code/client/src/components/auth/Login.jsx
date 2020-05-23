import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'clientSrc/constants/inputTypes';
import * as AuthActions from 'clientSrc/actions/authActions';
import { FacebookIconSpan, LinkRow } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';

import { Separator } from './Separator';
import { Input, PrimaryButton } from '../forms';

const inputsConfig = [
  { name: 'email', label: 'Email', type: InputTypes.EMAIL },
  { name: 'password', label: 'Password', type: InputTypes.PASSWORD },
];

export class LoginComponent extends Component {
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
    const { switchTab, logIn } = this.props;
    const { isFormValid, errors, inputs } = this.state;

    return (
      <form method="post">
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
        <PrimaryButton enabled={isFormValid} clickHandler={handlerWrapper(logIn, inputs)}>
          Log In
        </PrimaryButton>
        <Separator text="or" />
        <PrimaryButton>
          <>
            <FacebookIconSpan />
            Log in with Facebook
          </>
        </PrimaryButton>
        <PrimaryButton background="#ea4335">
          Log in with Google
        </PrimaryButton>
        <LinkRow onClick={switchTab}>
          Forgot Your Password?
        </LinkRow>
      </form>
    );
  }
}

LoginComponent.propTypes = ({
  switchTab: PropTypes.func,
  logIn: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  logIn: values => dispatch(AuthActions.logIn(values)),
});

export const Login = connect(null, mapDispatchToProps)(LoginComponent);
