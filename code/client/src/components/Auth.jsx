import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthContent, InputsBlock, LogoBlock, LogoTopBlock } from 'clientSrc/styles/blocks/auth';
import * as TABS from 'clientSrc/constants/authTabs';
import LogoTop from '~/static/logo-top.svgr';

import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { ResetPass } from './auth/ResetPass';
import { BottomBlock } from './forms';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: props.tab,
      history: props.history,
    };
  }

  renderTab = () => {
    switch (this.state.tab) {
      case TABS.SIGNUP_TAB: return <Signup />;
      case TABS.RESET_TAB: return <ResetPass switchTab={() => this.switchTab(TABS.SIGNUP_TAB)} />;
      default: return <Login switchTab={() => this.switchTab(TABS.RESET_TAB)} />;
    }
  };

  getTabBottom = () => {
    switch (this.state.tab) {
      case TABS.SIGNUP_TAB: return {
        message: 'Have an account? ',
        linkText: 'Log in',
        onClick: () => this.switchTab(TABS.LOGIN_TAB),
      };
      case TABS.RESET_TAB: return {
        message: '',
        linkText: 'Back to Login',
        onClick: () => this.switchTab(TABS.LOGIN_TAB),
      };
      default: return {
        message: 'Don\'t have an account? ',
        linkText: 'Sign up',
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
    const day = new Date().getDay() - 1;
    console.log(day);
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

Auth.propTypes = ({
  tab: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
});
