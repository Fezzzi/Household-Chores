import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import * as SettingTypes from 'shared/constants/settingTypes';
import { RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api';
import * as TABS from 'clientSrc/constants/authTabs';

import Home from './Home';
import Resource from './Resource';
import Auth from './auth';
import Settings from './settings';

const RouterComponent = ({ loggedUser }) => (
  <Router>
    <Switch>
      /* STATIC RESOURCES ROUTING */
      <Route
        path={`/${RESOURCES_PREFIX}`}
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/:resourceId`} component={Resource} />
            <Route exact path={`${url}`}>
              <Redirect to={{ pathname: '/' }} />
            </Route>
          </>
        )}
      />
      {!loggedUser
        ? (
          <Switch>
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
          </Switch>
        )
        : (
          <Switch>
            /* SETTINGS ROUTING */
            <Route path={`/${SETTINGS_PREFIX}`} render={({ match: { url } }) => (
              <>
                {Object.values(SettingTypes.CATEGORIES).map(category => (
                  <Route path={`${url}/${category}`} key={`settings-${category}`} render={props =>
                    <Settings {...props} categoryId={category} />
                  } />
                ))}
                <Route exact path={`${url}`} >
                  <Redirect to={{ pathname: `${url}/${SettingTypes.CATEGORIES.PROFILE}` }} />
                </Route>
              </>
            )} />

            <Route exact path="/" component={Home} />
            <Route path="/*">
              <Redirect to={{ pathname: '/' }} />
            </Route>
          </Switch>
        )}
    </Switch>
  </Router>
);

RouterComponent.propTypes = ({
  loggedUser: PropTypes.bool,
});

const mapStateToProps = ({ app: { loggedUser } }) => ({ loggedUser });

export default connect(mapStateToProps)(RouterComponent);
