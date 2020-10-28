import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { AUTH } from 'shared/constants/localeMessages';
import * as AuthActions from 'clientSrc/actions/authActions';
import { GoogleIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/form';

import { PrimaryButton } from '../index';
import LocaleText from '../../common/LocaleText';

const GoogleButtonComponent = ({ handleError, logInGoogle }) => (
  <GoogleLogin
    clientId={process.env.GCID}
    render={({ onClick, disabled }) => (
      <PrimaryButton
        clickHandler={onClick}
        background="#FAFAFA"
        backgroundHover="#E7E7E7"
        color="#262626"
        disabled={disabled}
        border
      >
        <FormButtonContentWrapper>
          <GoogleIconSpan />
          <LocaleText message={disabled ? AUTH.LOADING_DOTS : AUTH.LOG_IN_GOOGLE} />
        </FormButtonContentWrapper>
      </PrimaryButton>
    )}
    buttonText="Log in with Google"
    onSuccess={data => logInGoogle(data)}
    onFailure={error => handleError({ message: error.message || '' })}
    cookiePolicy="single_host_origin"
  />
);

GoogleButtonComponent.propTypes = {
  handleError: PropTypes.func.isRequired,
  logInGoogle: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logInGoogle: data => dispatch(AuthActions.logInGoogle(data)),
});

export default connect(null, mapDispatchToProps)(GoogleButtonComponent);
