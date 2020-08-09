import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as AuthActions from 'clientSrc/actions/authActions';
import { GoogleIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/auth';

import { PrimaryButton } from './PrimaryButton';

const GoogleButtonComponent = ({ handleError, logInGoogle }) => (
  <GoogleLogin
    clientId={process.env.GCID}
    render={({ onClick, disabled }) => (
      <PrimaryButton
        clickHandler={onClick}
        background="#FAFAFA"
        color="#262626"
        disabled={disabled}
        border
      >
        <FormButtonContentWrapper>
          <GoogleIconSpan />
          Log in with Google
        </FormButtonContentWrapper>
      </PrimaryButton>
    )}
    buttonText="Log in with Google"
    onSuccess={data => logInGoogle(data)}
    onFailure={error => handleError({ message: error.message || `Google API initialization error: ${error.error}` })}
    cookiePolicy="single_host_origin"
  />
);

GoogleButtonComponent.propTypes = ({
  handleError: PropTypes.func.isRequired,
  logInGoogle: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  logInGoogle: data => dispatch(AuthActions.logInGoogle(data)),
});

export const GoogleLoginButton = connect(null, mapDispatchToProps)(GoogleButtonComponent);
