import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import { PageContent, PageWrapper, PortalAnchor } from './styles/blocks'
import { PORTAL_TYPE } from './constants'
import createRootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import Notifications from './components/notifications'
import Router from './components/Router'
import PageTheme from './components/PageTheme'
import Footer from './components/Footer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'

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
            <PortalAnchor id={PORTAL_TYPE.TOOLTIPS} />
            <Modal />
            <PageContent>
              <Navbar />
              <Notifications />
              <Router />
            </PageContent>
            <Footer />
          </ConnectedRouter>
        </PageWrapper>
      </PageTheme>
    </Provider>
  )
}
