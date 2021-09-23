import React, { useCallback } from 'react'
import FacebookProvider, { Login } from 'react-facebook-sdk'
import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'

import FacebookIcon from 'assets/icons/facebook-white.svg'

import { AUTH } from 'shared/constants/localeMessages'
import { CONFIG } from 'web/constants'
import { AuthActions } from 'web/actions'
import { FormButtonContentWrapper, IconSpan } from 'web/styles/blocks/form'

import { LocaleText, PrimaryButton } from '../../common'

const FacebookLoginButton = ({ onError }) => {
  const locale = useSelector(({ locale: { locale } }) => locale)
  const dispatch = useDispatch()
  const logInFacebook = useCallback(data => dispatch(AuthActions.logInFacebook(data)), [dispatch])

  const renderLoginButton = (isLoading, onClick) => (
    <PrimaryButton
      onClick={onClick}
      background="#3B4998"
      backgroundHover="#303B7C"
      disabled={CONFIG.FB_APP_ID === null || isLoading}
      margin="0 40px 14px"
    >
      <FormButtonContentWrapper>
        <IconSpan currentColor="#3B4998">
          <FacebookIcon />
        </IconSpan>
        <LocaleText message={isLoading ? AUTH.LOADING_DOTS : AUTH.LOG_IN_FACEBOOK} />
      </FormButtonContentWrapper>
    </PrimaryButton>
  )

  return CONFIG.FB_APP_ID !== null
    ? (
      <FacebookProvider appId={CONFIG.FB_APP_ID} language={locale}>
        <Login
          scope="email"
          onResponse={data => logInFacebook(data)}
          onError={onError}
          render={({ isLoading, isWorking, onClick }) => renderLoginButton(isLoading || isWorking, onClick)}
        />
      </FacebookProvider>
    ) : renderLoginButton(false, () => {})
}

FacebookLoginButton.propTypes = {
  onError: PropTypes.func.isRequired,
}

export default FacebookLoginButton
