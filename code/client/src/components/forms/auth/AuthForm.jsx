import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthContent, InputsBlock, LogoBlock, LogoTopBlock } from 'clientSrc/styles/blocks/auth';
import * as TABS from 'clientSrc/constants/authTabs';
import { AUTH } from 'shared/constants/localeMessages';
import LogoTop from '~/static/logo-top.svgr';

import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import ResetPassForm from './ResetPassForm';
import BottomBlock from './BottomBlock';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: props.tab,
      history: props.history,
    };
  }

  renderTab = () => {
    switch (this.state.tab) {
      case TABS.SIGNUP_TAB: return <SignUpForm />;
      case TABS.RESET_TAB: return <ResetPassForm switchTab={() => this.switchTab(TABS.SIGNUP_TAB)} />;
      default: return <LogInForm switchTab={() => this.switchTab(TABS.RESET_TAB)} />;
    }
  };

  getTabBottom = () => {
    switch (this.state.tab) {
      case TABS.SIGNUP_TAB: return {
        message: AUTH.HAVE_ACCOUNT,
        linkMessage: AUTH.LOG_IN,
        onClick: () => this.switchTab(TABS.LOGIN_TAB),
      };
      case TABS.RESET_TAB: return {
        message: '',
        linkMessage: AUTH.BACK_TO_LOGIN,
        onClick: () => this.switchTab(TABS.LOGIN_TAB),
      };
      default: return {
        message: AUTH.DONT_HAVE_ACCOUNT,
        linkMessage: AUTH.SIGN_UP,
        onClick: () => this.switchTab(TABS.SIGNUP_TAB),
      };
    }
  };

  switchTab = tab => {
    this.state.history.push(tab);

    this.setState({
      tab,
    });
  };

  getRoofStroke = () => {
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

  render() {
    return (
      <>
        <AuthContent>
          <LogoBlock>
            <LogoTopBlock stroke={this.getRoofStroke()}>
              <LogoTop />
            </LogoTopBlock>
            HouseHold
          </LogoBlock>
          <InputsBlock extraPadding>
            {this.renderTab()}
          </InputsBlock>
          <InputsBlock>
            <BottomBlock {...(this.getTabBottom())} />
          </InputsBlock>
        </AuthContent>
      </>
    );
  }
}

AuthForm.propTypes = {
  tab: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
