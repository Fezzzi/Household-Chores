import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import LogoTop from 'assets/icons/logo.svg'

import { AUTH } from 'shared/constants/localeMessages'
import { API } from 'shared/constants'
import { AuthContent, InputsBlock, LogoBlock, LogoTopBlock } from 'web/styles/blocks/auth'
import { AUTH_TABS } from 'web/constants'

import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import ResetPassForm from './ResetPassForm'
import BottomBlock from './BottomBlock'

const AuthForm = ({ history, location }) => {
  const currentTab = useMemo(() => location.pathname.split('/').filter(Boolean)[0], [location])

  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean)[0]
    if (path !== AUTH_TABS.LOGIN_TAB && path !== AUTH_TABS.RESET_TAB && path !== AUTH_TABS.SIGNUP_TAB) {
      history.push({
        pathname: `/${AUTH_TABS.LOGIN_TAB}`,
        hash: location.pathname !== '/'
          ? `${location.pathname}${location.search}`
          : '',
      })
    }
  }, [location])

  const switchTab = newTab => history.push({
    pathname: newTab,
    hash: location.hash,
  })

  const showTaC = () => history.push(`/${API.RESOURCES_PREFIX}/${API.RESOURCE_TAC}`)

  const renderTab = () => {
    switch (currentTab) {
      case AUTH_TABS.SIGNUP_TAB: return <SignUpForm showTaC={showTaC} />
      case AUTH_TABS.RESET_TAB: return <ResetPassForm switchTab={switchTab} />
      default: return <LogInForm switchTab={switchTab} />
    }
  }

  const getTabBottom = () => {
    switch (currentTab) {
      case AUTH_TABS.SIGNUP_TAB: return {
        message: AUTH.HAVE_ACCOUNT,
        linkMessage: AUTH.LOG_IN,
        onClick: () => switchTab(AUTH_TABS.LOGIN_TAB),
      }
      case AUTH_TABS.RESET_TAB: return {
        message: '',
        linkMessage: AUTH.BACK_TO_LOGIN,
        onClick: () => switchTab(AUTH_TABS.LOGIN_TAB),
      }
      default: return {
        message: AUTH.DONT_HAVE_ACCOUNT,
        linkMessage: AUTH.SIGN_UP,
        onClick: () => switchTab(AUTH_TABS.SIGNUP_TAB),
      }
    }
  }

  return (
    <AuthContent>
      <LogoBlock>
        <LogoTopBlock>
          <LogoTop />
        </LogoTopBlock>
        HouseHold
      </LogoBlock>
      <InputsBlock extraPadding>
        {renderTab()}
      </InputsBlock>
      <InputsBlock>
        <BottomBlock {...(getTabBottom())} />
      </InputsBlock>
    </AuthContent>
  )
}

AuthForm.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default AuthForm
