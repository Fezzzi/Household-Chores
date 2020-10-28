import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages';
import * as AuthActions from 'clientSrc/actions/authActions';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { LinkRow } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';

import FacebookLoginButton from './FacebookLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import TextInput from '../inputs/TextInput';
import PrimaryButton from '../common/PrimaryButton';
import Separator from '../common/Separator';
import LocaleText from '../../common/LocaleText';

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
  { name: 'password', message: FORM.PASSWORD, type: InputTypes.PASSWORD },
];

class LogInForm extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitMessage: AUTH.LOG_IN,
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
    this.props.logIn(this.state.inputs);
    this.setState({ isFormSending: true, submitMessage: COMMON.SENDING });
    this.timer = setTimeout(
      () => this && this.setState({ isFormSending: false, submitMessage: AUTH.LOG_IN }), SUBMIT_TIMEOUT
    );
  });

  render() {
    const { switchTab } = this.props;
    const { submitMessage, isFormValid, isFormSending, errors } = this.state;

    return (
      <form method="post">
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
        <Separator message={COMMON.OR} />
        <FacebookLoginButton handleError={this.handleError} />
        <GoogleLoginButton handleError={this.handleError} />
        <LinkRow onClick={switchTab}>
          <LocaleText message={AUTH.FORGOT_PASS} />
        </LinkRow>
      </form>
    );
  }
}

LogInForm.propTypes = {
  switchTab: PropTypes.func,
  logIn: PropTypes.func,
  addNotification: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logIn: values => dispatch(AuthActions.logIn(values)),
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(LogInForm);
