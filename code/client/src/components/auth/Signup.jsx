import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'clientSrc/constants/inputTypes';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as RootActions from 'clientSrc/actions/rootActions';
import { MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';

import { Separator } from './Separator';
import { FacebookLoginButton } from './FacebookLoginButton';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Input, PrimaryButton } from '../forms';

const inputsConfig = [
  { name: 'email', label: 'Email', type: InputTypes.EMAIL },
  { name: 'nickname', label: 'Nickname', type: InputTypes.TEXT },
  { name: 'password', label: 'Password', type: InputTypes.PASSWORD },
];

export class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitText: 'Sign Up',
      isFormValid: false,
      isFormSending: false,
      inputs: Object.fromEntries(inputsConfig.map(input =>
        [input.name, { valid: false, value: '' }]
      )),
      errors: {},
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleError = error => this.props.addNotification('errors', error.message);

  handleClick = handlerWrapper(() => {
    this.props.signUp(this.state.inputs);
    this.setState({ isFormSending: true, submitText: 'Sending' });
    this.timer = setTimeout(
      () => this.setState({ isFormSending: false, submitText: 'Sign Up' }), 2500
    );
  });

  render() {
    const { isFormValid, isFormSending, errors, submitText } = this.state;

    return (
      <form method="post">
        <FacebookLoginButton isLogIn={false} handleError={this.handleError} />
        <GoogleLoginButton isLogIn={false} handleError={this.handleError} />
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
        <PrimaryButton disabled={!isFormValid || isFormSending} clickHandler={this.handleClick}>
          {submitText}
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
  addNotification: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values)),
  addNotification: (type, message) => dispatch(RootActions.addNotifications({
    [type]: [message],
  })),
});

export const Signup = connect(null, mapDispatchToProps)(SignupComponent);
