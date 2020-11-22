import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api';
import * as TABS from 'clientSrc/constants/authTabs';
import * as SettingTypes from 'shared/constants/settingTypes';

import Home from './Home';
import Resource from './Resource';
import AuthForm from './forms/auth/AuthForm';
import Settings from './settings/Settings';

export const history = createBrowserHistory();

const Router = () => {
  const isLoggedUser = useSelector(({ app: { loggedUser } }) => loggedUser);

  return (
    <BrowserRouter history={history}>
      <Switch>
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
        {!isLoggedUser
          ? (
            <Switch>
              <Route
                path={`/${TABS.LOGIN_TAB}`}
                render={props => <AuthForm {...props} tab={TABS.LOGIN_TAB} />}
              />
              <Route
                path={`/${TABS.SIGNUP_TAB}`}
                render={props => <AuthForm {...props} tab={TABS.SIGNUP_TAB} />}
              />
              <Route
                path={`/${TABS.RESET_TAB}`}
                render={props => <AuthForm {...props} tab={TABS.RESET_TAB} />}
              />
              <Route path="/*">
                <Redirect to={`/${TABS.LOGIN_TAB}`} />
              </Route>
            </Switch>
          )
          : (
            <Switch>
              <Route exact path={`/${SETTINGS_PREFIX}/:category?:tab`} component={Settings} />
              <Route path={`/${SETTINGS_PREFIX}`}>
                <Redirect to={{
                  pathname: `/${SETTINGS_PREFIX}/${SettingTypes.CATEGORIES.PROFILE}`,
                  search: `tab=${SettingTypes.TAB_ROWS[SettingTypes.CATEGORIES.PROFILE][0]}`,
                }}
                />
              </Route>

              <Route exact path="/" component={Home} />
              <Route path="/*">
                <Redirect to={{ pathname: '/' }} />
              </Route>
            </Switch>
          )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
