import React from 'react';
import FacebookProvider, { Login } from 'react-facebook-sdk';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import * as AuthActions from 'clientSrc/actions/authActions';
import { FacebookIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/auth';

import { PrimaryButton } from './PrimaryButton';

const FacebookButtonComponent = ({ handleError, logInFacebook }) => (
  <FacebookProvider appId="694001678055824" language="en_US">
    <Login
      scope="email"
      onResponse={data => logInFacebook(data)}
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

FacebookButtonComponent.propTypes = ({
  handleError: PropTypes.func.isRequired,
  logInFacebook: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  logInFacebook: data => dispatch(AuthActions.logInFacebook(data)),
});

export const FacebookLoginButton = connect(null, mapDispatchToProps)(FacebookButtonComponent);
