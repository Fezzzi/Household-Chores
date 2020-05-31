import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import * as TABS from 'clientSrc/constants/authTabs';
import { PageWrapper, PageContent } from 'clientSrc/styles/blocks';

import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';
import { Notifications } from './components/notifications';
import { Auth } from './components/Auth';
import { Footer } from './components/Footer';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer,
    compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v));

  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <PageWrapper className="light">
        <PageContent>
          <Notifications />
          <Router>
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
              <Route path="/" render={props => <Auth {...props} tab={TABS.LOGIN_TAB} />} />
            </Switch>
          </Router>
        </PageContent>
        <Footer />
      </PageWrapper>
    </Provider>
  );
};
