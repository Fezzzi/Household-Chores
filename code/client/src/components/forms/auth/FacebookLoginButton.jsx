import React, { useCallback } from 'react'
import FacebookProvider, { Login } from 'react-facebook-sdk'
import { useDispatch, useSelector } from 'react-redux'
import { PropTypes } from 'prop-types'

import { AUTH } from 'shared/constants/localeMessages'
import { AuthActions } from 'clientSrc/actions'
import { FacebookIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/form'

import LocaleText from '../../common/LocaleText'
import PrimaryButton from '../common/PrimaryButton'

const FacebookLoginButton = ({ onError }) => {
  const locale = useSelector(({ locale: { locale } }) => locale)
  const dispatch = useDispatch()
  const logInFacebook = useCallback(data => dispatch(AuthActions.logInFacebook(data)), [dispatch])

  return (
    <FacebookProvider appId="694001678055824" language={locale}>
      <Login
        scope="email"
        onResponse={data => logInFacebook(data)}
        onError={onError}
        render={({ isLoading, isWorking, onClick }) => (
          <PrimaryButton
            onClick={onClick}
            background="#3B4998"
            backgroundHover="#303B7C"
            color="#FAFAFA"
            disabled={isLoading || isWorking}
            margin="0 40px 14px"
          >
            <FormButtonContentWrapper>
              <FacebookIconSpan />
              <LocaleText message={isLoading || isWorking ? AUTH.LOADING_DOTS : AUTH.LOG_IN_FACEBOOK} />
            </FormButtonContentWrapper>
          </PrimaryButton>
        )}
      />
    </FacebookProvider>
  )
}

FacebookLoginButton.propTypes = {
  onError: PropTypes.func.isRequired,
}

export default FacebookLoginButton
