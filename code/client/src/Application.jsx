import React from 'react'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'

import { PageContent, PageWrapper, PortalAnchor } from 'clientSrc/styles/blocks'
import { PORTAL_TYPE } from 'clientSrc/constants'

import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'
import Notifications from './components/notifications'
import Router, { history } from './components/Router'
import PageTheme from './components/PageTheme'
import Footer from './components/Footer'
import Modal from './components/modals/Modal'
import Navbar from "clientSrc/components/Navbar";

export default () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(rootReducer,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : v => v))

  sagaMiddleware.run(rootSaga)

  return (
    <Provider store={store}>
      <PageTheme>
        <PortalAnchor id={PORTAL_TYPE.FLOATING_UI} />
        <PageWrapper id="pageWrapper">
          <PortalAnchor id={PORTAL_TYPE.TOOLTIPS} />
          <Modal />
          <PageContent>
            <Navbar />
            <Notifications />
            <Router />
          </PageContent>
          <Footer />
        </PageWrapper>
      </PageTheme>
    </Provider>
  )
}
