import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { PageWrapper, PortalAnchor } from './styles/blocks/page'
import { PORTAL_TYPE } from './constants'
import createRootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import PageTheme from './components/PageTheme'
import { Content } from './components/Content'

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const history = createBrowserHistory()

  const store = createStore(createRootReducer(history),
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v))

  sagaMiddleware.run(rootSaga)

  return (
    <Provider store={store}>
      <PageTheme>
        <PortalAnchor id={PORTAL_TYPE.FLOATING_UI} />
        <PageWrapper id="pageWrapper">
          <ConnectedRouter history={history}>
            <Content />
          </ConnectedRouter>
        </PageWrapper>
      </PageTheme>
    </Provider>
  )
}
