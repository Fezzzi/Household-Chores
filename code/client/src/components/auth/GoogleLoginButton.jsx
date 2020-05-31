import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as AuthActions from 'clientSrc/actions/authActions';
import { GoogleIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/auth';

import { PrimaryButton } from '../forms';

class GoogleButtonComponent extends Component {
  handleResponse = data => this.props.isLogIn
    ? this.props.logInGoogle(data)
    : this.props.signUpGoogle(data);

  render() {
    const { handleError } = this.props;

    return (
      <GoogleLogin
        clientId="239994956143-jija8teo4gj7ao5iq3bht5eivu1ib4t8.apps.googleusercontent.com"
        render={({ onClick, disabled }) => (
          <PrimaryButton clickHandler={onClick} background="#fafafa" color="#262626" 
            disabled={disabled} border={true}>
            <FormButtonContentWrapper>
              <GoogleIconSpan />
              Log in with Google
            </FormButtonContentWrapper>
          </PrimaryButton>
        )}
        buttonText="Log in with Google"
        onSuccess={this.handleResponse}
        onFailure={handleError}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

GoogleButtonComponent.propTypes = ({
  isLogIn: PropTypes.bool,
  handleError: PropTypes.func.isRequired,
  logInGoogle: PropTypes.func,
  signUpGoogle: PropTypes.func,
});

GoogleButtonComponent.defaultProps = ({
  isLogIn: true,
});

const mapDispatchToProps = dispatch => ({
  logInGoogle: data => dispatch(AuthActions.logInGoogle(data)),
  signUpGoogle: data => dispatch(AuthActions.signUpGoogle(data)),
});

export const GoogleLoginButton = connect(null, mapDispatchToProps)(GoogleButtonComponent);
