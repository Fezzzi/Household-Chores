import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api';
import * as TABS from 'clientSrc/constants/authTabs';

import Auth from './Auth';
import Home from './Home';
import Resource from './Resource';
import Settings from './settings';

const RouterComponent = ({ loggedUser }) => (
  <Router>
    <Switch>
      <Route
        path={`/${RESOURCES_PREFIX}`}
        render={({ match: { url } }) => (
          <Route path={`${url}/:resourceId`} component={Resource} />
        )}
      />
      {!loggedUser
        ? (
          <>
            <Route
              path={`/${TABS.LOGIN_TAB}`}
              render={props => <Auth {...props} tab={TABS.LOGIN_TAB} />}
            />
            <Route
              path={`/${TABS.SIGNUP_TAB}`}
              render={props => <Auth {...props} tab={TABS.SIGNUP_TAB} />}
            />
            <Route
              path={`/${TABS.RESET_TAB}`}
              render={props => <Auth {...props} tab={TABS.RESET_TAB} />}
            />
            <Route path="/*">
              <Redirect to={`/${TABS.LOGIN_TAB}`} />
            </Route>
          </>
        )
        : (
          <>
            <Route path={`/${SETTINGS_PREFIX}`} component={Settings} />
            <Route exact path="/" component={Home} />
            <Route path="/*">
              <Redirect to={{ pathname: '/' }} />
            </Route>
          </>
        )}
    </Switch>
  </Router>
);

RouterComponent.propTypes = ({
  loggedUser: PropTypes.bool,
});

const mapStateToProps = ({ app: { loggedUser } }) => ({ loggedUser });

export default connect(mapStateToProps)(RouterComponent);
