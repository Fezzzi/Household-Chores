import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import * as SettingTypes from 'shared/constants/settingTypes';
import { RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api';
import * as TABS from 'clientSrc/constants/authTabs';

import { history } from '../Application';
import Home from './Home';
import Resource from './Resource';
import AuthForm from './forms/auth/AuthForm';
import Settings from './settings/Settings';

const getTabQuery = queries =>
  queries.split(/\?&/)?.find(query => query.match(/tab=.+/))?.split('=')[1];

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
              <Route
                path={`/${SETTINGS_PREFIX}`}
                render={({ match: { url } }) => (
                  <>
                    {Object.values(SettingTypes.CATEGORIES).map(category => (
                      <Route
                        path={`${url}/${category}`}
                        key={`settings-${category}`}
                        render={params =>
                          <Settings {...params} categoryId={category} tabId={getTabQuery(params.location.search)} />}
                      />
                    ))}
                    <Route exact path={`${url}`}>
                      <Redirect to={{ pathname: `${url}/${SettingTypes.CATEGORIES.PROFILE}` }} />
                    </Route>
                  </>
                )}
              />

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
