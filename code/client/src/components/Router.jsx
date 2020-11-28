import React from 'react'
import { useSelector } from 'react-redux'
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { API, SETTING_TAB_ROWS, SETTING_CATEGORIES } from 'shared/constants'

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
          path={`/${API.RESOURCES_PREFIX}`}
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
              <Route exact path={`/${API.SETTINGS_PREFIX}/:category?:tab`} component={Settings} />
              <Route path={`/${API.SETTINGS_PREFIX}`}>
                <Redirect to={{
                  pathname: `/${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}`,
                  search: `tab=${SETTING_TAB_ROWS[SETTING_CATEGORIES.PROFILE][0]}`,
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
