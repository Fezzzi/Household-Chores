import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AuthContent, InputsBlock, LogoBlock, LogoTopBlock } from 'clientSrc/styles/blocks/auth';
import * as TABS from 'clientSrc/constants/authTabs';

import { BottomBlock } from './auth/BottomBlock';
import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import { ResetPass } from './auth/ResetPass';

export class Auth extends Component {
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
  }

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
  }

  switchTab = tab => {
    this.state.history.push(tab);

    this.setState({
      tab,
    });
  }

  render() {
    return (
      <>
        <AuthContent>
          <LogoBlock>
            <LogoTopBlock />
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
