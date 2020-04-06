import React, { Component } from 'react';
import createSagaMiddleware from "redux-saga";
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from "redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { rootReducer } from "./reducers/rootReducer";
import { rootSaga } from "./sagas/rootSaga";
import { Root } from './components/Root';

export default class Application extends Component {
  componentDidMount() {
    // EXAMPLE FETCH REQUEST

    // const URL = 'http://localhost:9000/example'
    // const options = { method: 'GET' }

    // fetch(URL, options)
    // .then(response => {
    //   if (response.status === 200) {
    //     return response.json()
    //   } else {
    //     throw new Error(response.statusText);
    //   }
    // })
    // .then(data => {
    //   // Do something with the data
    // })
    // .catch(error => alert(error))
  }

  render() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(rootReducer,
        compose(applyMiddleware(sagaMiddleware), (window as any)['__REDUX_DEVTOOLS_EXTENSION__']
            ? (window as any)['__REDUX_DEVTOOLS_EXTENSION__']()
            : (v: any) => v));

    sagaMiddleware.run(rootSaga);

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/login'>
              <Root />
            </Route>
            <Route>
              <Redirect to='/login'/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}
