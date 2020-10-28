import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { PageContent, PageWrapper, PortalAnchor } from 'clientSrc/styles/blocks';
import * as PortalType from 'clientSrc/constants/portalType';

import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';
import Notifications from './components/notifications';
import Router from './components/Router';
import PageTheme from './components/PageTheme';
import Footer from './components/Footer';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer,
    compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v));

  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <PageTheme>
        <PortalAnchor id={PortalType.FLOATING_UI} />
        <PageWrapper id="pageWrapper">
          <PortalAnchor id={PortalType.TOOLTIPS} />
          <div id={PortalType.MODALS} />
          <PageContent>
            <Notifications />
            <Router />
          </PageContent>
          <Footer />
        </PageWrapper>
      </PageTheme>
    </Provider>
  );
};
