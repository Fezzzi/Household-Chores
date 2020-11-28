import React from 'react'
import FacebookProvider, { Login } from 'react-facebook-sdk'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { AUTH } from 'shared/constants/localeMessages'
import * as AuthActions from 'clientSrc/actions/authActions'
import { FacebookIconSpan, FormButtonContentWrapper } from 'clientSrc/styles/blocks/form'

import LocaleText from '../../common/LocaleText'
import PrimaryButton from '../common/PrimaryButton'

const FacebookButtonComponent = ({ locale, handleError, logInFacebook }) => (
  <FacebookProvider appId="694001678055824" language={locale}>
    <Login
      scope="email"
      onResponse={data => logInFacebook(data)}
      onError={handleError}
      render={({ isLoading, isWorking, onClick }) => (
        <PrimaryButton
          clickHandler={onClick}
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

FacebookButtonComponent.propTypes = {
  locale: PropTypes.string,
  handleError: PropTypes.func.isRequired,
  logInFacebook: PropTypes.func,
}

const mapStateToProps = ({ locale: { locale } }) => ({
  locale,
})

const mapDispatchToProps = dispatch => ({
  logInFacebook: data => dispatch(AuthActions.logInFacebook(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FacebookButtonComponent)
