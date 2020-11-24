import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { AuthContent, InputsBlock, LogoBlock, LogoTopBlock } from 'clientSrc/styles/blocks/auth';
import * as TABS from 'clientSrc/constants/authTabs';
import { AUTH } from 'shared/constants/localeMessages';
import LogoTop from '~/static/logo-top.svgr';

import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import ResetPassForm from './ResetPassForm';
import BottomBlock from './BottomBlock';

const AuthForm = ({ history, location }) => {
  const currentTab = useMemo(() => location.pathname.split('/').filter(Boolean)[0], [location]);

  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean)[0];
    if (path !== TABS.LOGIN_TAB && path !== TABS.RESET_TAB && path !== TABS.SIGNUP_TAB) {
      history.push(`/${TABS.LOGIN_TAB}`);
    }
  }, [location]);

  const renderTab = () => {
    switch (currentTab) {
      case TABS.SIGNUP_TAB: return <SignUpForm />;
      case TABS.RESET_TAB: return <ResetPassForm switchTab={() => switchTab(TABS.SIGNUP_TAB)} />;
      default: return <LogInForm switchTab={() => switchTab(TABS.RESET_TAB)} />;
    }
  };

  const getTabBottom = () => {
    switch (currentTab) {
      case TABS.SIGNUP_TAB: return {
        message: AUTH.HAVE_ACCOUNT,
        linkMessage: AUTH.LOG_IN,
        onClick: () => switchTab(TABS.LOGIN_TAB),
      };
      case TABS.RESET_TAB: return {
        message: '',
        linkMessage: AUTH.BACK_TO_LOGIN,
        onClick: () => switchTab(TABS.LOGIN_TAB),
      };
      default: return {
        message: AUTH.DONT_HAVE_ACCOUNT,
        linkMessage: AUTH.SIGN_UP,
        onClick: () => switchTab(TABS.SIGNUP_TAB),
      };
    }
  };

  const switchTab = newTab => history.push(newTab);

  const getRoofStroke = () => {
    const day = new Date().getDay();
    switch (day) {
      case 1:
      case 4:
        return 'var(--cYellowSecondary)';
      case 2:
      case 3:
        return 'var(--cRedSecondary)';
      case 5:
      case 7:
        return 'var(--cGreenSecondary)';
      case 6:
        return 'var(--cBlueSecondary)';
      default:
        return 'var(--cFont)';
    }
  };

  return (
    <>
      <AuthContent>
        <LogoBlock>
          <LogoTopBlock stroke={getRoofStroke()}>
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
    </>
  );
};

AuthForm.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthForm;
