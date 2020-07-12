import React, { Component } from 'react';
import FacebookProvider, { Login } from 'react-facebook-sdk';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as AuthActions from 'clientSrc/actions/authActions';
import { FacebookIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/auth';

import { PrimaryButton } from './PrimaryButton';

class FacebookButtonComponent extends Component {
  handleResponse = data => this.props.isLogIn
    ? this.props.logInFacebook(data)
    : this.props.signUpFacebook(data);

  render() {
    const { handleError } = this.props;

    return (
      <FacebookProvider appId="694001678055824" language="en_US">
        <Login
          scope="email"
          onResponse={this.handleResponse}
          onError={handleError}
          render={({ isLoading, isWorking, onClick }) => (
            <PrimaryButton clickHandler={onClick} disabled={isLoading || isWorking}>
              <FormButtonContentWrapper>
                <FacebookIconSpan />
                {isLoading || isWorking ? 'Loading...' : 'Log in with Facebook'}
              </FormButtonContentWrapper>
            </PrimaryButton>
          )}
        />
      </FacebookProvider>
    );
  }
}

FacebookButtonComponent.propTypes = ({
  isLogIn: PropTypes.bool,
  handleError: PropTypes.func.isRequired,
  logInFacebook: PropTypes.func,
  signUpFacebook: PropTypes.func,
});


FacebookButtonComponent.defaultProps = ({
  isLogIn: true,
});

const mapDispatchToProps = dispatch => ({
  logInFacebook: data => dispatch(AuthActions.logInFacebook(data)),
  signUpFacebook: data => dispatch(AuthActions.signUpFacebook(data)),
});

export const FacebookLoginButton = connect(null, mapDispatchToProps)(FacebookButtonComponent);
