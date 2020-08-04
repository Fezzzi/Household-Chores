import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { PageWrapper, PageContent } from 'clientSrc/styles/blocks';

import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';
import { Notifications } from './components/notifications';
import Router from './components/Router';
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
          <Router />
        </PageContent>
        <Footer />
      </PageWrapper>
    </Provider>
  );
};
