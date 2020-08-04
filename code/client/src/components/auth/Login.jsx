import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { LinkRow } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';

import { Input, Separator, PrimaryButton, FacebookLoginButton, GoogleLoginButton } from '../forms';

const inputConfig = [
  { name: 'email', label: 'Email', type: InputTypes.EMAIL },
  { name: 'password', label: 'Password', type: InputTypes.PASSWORD },
];

export class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitText: 'Log In',
      isFormValid: false,
      isFormSending: false,
      inputs: Object.fromEntries(inputConfig.map(input =>
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
    this.props.logIn(this.state.inputs);
    this.setState({ isFormSending: true, submitText: 'Sending' });
    this.timer = setTimeout(
      () => this && this.setState({ isFormSending: false, submitText: 'Log In' }), SUBMIT_TIMEOUT
    );
  });

  render() {
    const { switchTab } = this.props;
    const { submitText, isFormValid, isFormSending, errors } = this.state;

    return (
      <form method="post">
        {inputConfig.map(input => (
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
        <Separator text="or" />
        <FacebookLoginButton handleError={this.handleError} />
        <GoogleLoginButton handleError={this.handleError} />
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
  addNotification: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  logIn: values => dispatch(AuthActions.logIn(values)),
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export const Login = connect(null, mapDispatchToProps)(LoginComponent);
