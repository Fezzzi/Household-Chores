import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as InputTypes from 'shared/constants/inputTypes';
import { AUTH, COMMON, FORM } from 'shared/constants/localeMessages';
import * as AuthActions from 'clientSrc/actions/authActions';
import { MessageBlock, LinkRow } from 'clientSrc/styles/blocks/auth';
import { updateInput, handlerWrapper } from 'clientSrc/helpers/auth';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';

import { Separator, TextInput, PrimaryButton } from '../forms';
import LocaleText from '../common/LocaleText';

const inputConfig = [
  { name: 'email', message: FORM.EMAIL, type: InputTypes.EMAIL },
];

export class ResetPassComponent extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
    this.state = {
      submitMessage: AUTH.SEND_RESET_LINK,
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

  handleClick = handlerWrapper(() => {
    this.props.resetPass(this.state.inputs);
    this.setState({ isFormSending: true, submitMessage: COMMON.SENDING });
    this.timer = setTimeout(
      () => this.setState({ isFormSending: false, submitMessage: AUTH.SEND_RESET_LINK }), SUBMIT_TIMEOUT
    );
  });

  render() {
    const { switchTab } = this.props;
    const { submitMessage, isFormValid, isFormSending, errors } = this.state;

    return (
      <form method="post">
        <MessageBlock bigFont>
          <LocaleText message={AUTH.ENTER_EMAIL_QUOTE} />
        </MessageBlock>
        {inputConfig.map(input => (
          <TextInput
            name={input.name}
            key={input.name}
            message={input.message}
            type={input.type}
            hasError={!!errors[input.name]}
            updateInput={updateInput(this.setState.bind(this), input.name)}
          />
        ))}
        <PrimaryButton disabled={!isFormValid || isFormSending} clickHandler={this.handleClick}>
          <LocaleText message={submitMessage} />
        </PrimaryButton>
        <Separator message={COMMON.OR} />
        <LinkRow onClick={switchTab}>
          <LocaleText message={AUTH.CREATE_ACCOUNT} />
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
