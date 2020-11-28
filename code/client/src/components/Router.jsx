import React from 'react'
import { useSelector } from 'react-redux'
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { RESOURCES_PREFIX, SETTINGS_PREFIX } from 'shared/constants/api'
import * as SettingTypes from 'shared/constants/settingTypes'

import Home from './Home'
import Resource from './Resource'
import AuthForm from './forms/auth/AuthForm'
import Settings from './settings/Settings'

export const history = createBrowserHistory()

const Router = () => {
  const { loggedUser, loaded } = useSelector(({ app: { loggedUser, loaded } }) => ({ loggedUser, loaded }))

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
        {loaded && (!loggedUser
          ? (
            <Switch>
              <Route path="/*" component={AuthForm} />
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
          ))}
      </Switch>
    </BrowserRouter>
  )
}

export default Router
