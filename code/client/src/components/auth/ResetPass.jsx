import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import * as AuthActions from 'clientSrc/actions/authActions';
import { MessageBlock, LinkRow } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';

import { Separator, Input, PrimaryButton } from '../forms';

const inputsConfig = [
  { name: 'email', label: 'Email', type: InputTypes.EMAIL },
];

export class ResetPassComponent extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitText: 'Send Reset Link',
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

  handleClick = handlerWrapper(() => {
    this.props.resetPass(this.state.inputs);
    this.setState({ isFormSending: true, submitText: 'Sending' });
    this.timer = setTimeout(
      () => this.setState({ isFormSending: false, submitText: 'Send Reset Link' }), 2500
    );
  });

  render() {
    const { switchTab } = this.props;
    const { submitText, isFormValid, isFormSending, errors } = this.state;

    return (
      <form method="post">
        <MessageBlock bigFont>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </MessageBlock>
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
        <Separator text="or" />
        <LinkRow onClick={switchTab}>
          Create New Account
        </LinkRow>
      </form>
    );
  }
}

ResetPassComponent.propTypes = ({
  switchTab: PropTypes.func,
  resetPass: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  resetPass: values => dispatch(AuthActions.resetPass(values)),
});

export const ResetPass = connect(null, mapDispatchToProps)(ResetPassComponent);
