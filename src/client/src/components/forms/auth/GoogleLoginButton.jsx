import React, { useCallback } from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'

import GoogleIcon from 'assets/icons/google.svg'

import { AUTH } from 'shared/constants/localeMessages'
import { AuthActions } from 'clientSrc/actions'
import { FormButtonContentWrapper, IconSpan } from 'clientSrc/styles/blocks/form'

import { LocaleText, PrimaryButton } from '../../common'

const GoogleLoginButton = ({ onError }) => {
  const dispatch = useDispatch()
  const logInGoogle = useCallback(data => dispatch(AuthActions.logInGoogle(data)), [dispatch])

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={({ onClick, disabled }) => (
        <PrimaryButton
          onClick={onClick}
          background="#FAFAFA"
          backgroundHover="#E7E7E7"
          color="#262626"
          disabled={disabled}
          border
        >
          <FormButtonContentWrapper>
            <IconSpan>
              <GoogleIcon />
            </IconSpan>
            <LocaleText message={disabled ? AUTH.LOADING_DOTS : AUTH.LOG_IN_GOOGLE} />
          </FormButtonContentWrapper>
        </PrimaryButton>
      )}
      buttonText="Log in with Google"
      onSuccess={data => logInGoogle(data)}
      onFailure={error => onError({ message: error.message || '' })}
      cookiePolicy="single_host_origin"
    />
  )
}

GoogleLoginButton.propTypes = {
  onError: PropTypes.func.isRequired,
}

export default GoogleLoginButton
