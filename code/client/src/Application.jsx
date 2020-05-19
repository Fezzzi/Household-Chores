import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import rootReducer from './reducers/rootReducer';
import { rootSaga } from './sagas/rootSaga';
import { Auth } from './components/Auth';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer,
    compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v));

  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <Auth />
      <Router>
        <Switch>
          <Route path="/login">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};
