import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages';
import { RESOURCES_PREFIX, RESOURCE_TAC } from 'shared/constants/api';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { MessageBlock, MessageBlockLink } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';

import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { TextInput, Separator, PrimaryButton } from '../forms';
import LocaleText from '../common/LocaleText';

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
  { name: 'nickname', message: FORM.NICKNAME, type: InputTypes.TEXT },
  { name: 'password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
];

export class SignupComponent extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitMessage: AUTH.SIGN_UP,
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

  handleError = error => this.props.addNotification(NotificationTypes.ERRORS, error.message);

  handleClick = handlerWrapper(() => {
    this.props.signUp(this.state.inputs);
    this.setState({ isFormSending: true, submitMessage: COMMON.SENDING });
    this.timer = setTimeout(
      () => this.setState({ isFormSending: false, submitMessage: AUTH.SIGN_UP }), SUBMIT_TIMEOUT
    );
  });

  render() {
    const { submitMessage, isFormValid, isFormSending, errors } = this.state;

    return (
      <form method="post">
        <FacebookLoginButton handleError={this.handleError} />
        <GoogleLoginButton handleError={this.handleError} />
        <Separator message={COMMON.OR} />
        {inputConfig.map(input => (
          <TextInput
            name={input.name}
            key={input.name}
            message={input.message}
            type={input.type}
            fixedPadding
            inputError={errors[input.name] || ''}
            updateInput={updateInput(this.setState.bind(this), input.name)}
          />
        ))}
        <PrimaryButton disabled={!isFormValid || isFormSending} clickHandler={this.handleClick}>
          <LocaleText message={submitMessage} />
        </PrimaryButton>
        <MessageBlock>
          <LocaleText message={AUTH.TERMS_AGREEMENT} />
          <MessageBlockLink target="_self" href={`/${RESOURCES_PREFIX}/${RESOURCE_TAC}`}>
            <LocaleText message={COMMON.TERMS_AND_CONDITIONS} />
          </MessageBlockLink>.
        </MessageBlock>
      </form>
    );
  }
}

SignupComponent.propTypes = {
  signUp: PropTypes.func,
  addNotification: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  signUp: values => dispatch(AuthActions.signUp(values)),
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export const Signup = connect(null, mapDispatchToProps)(SignupComponent);
