import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { API } from 'shared/constants'
import { PageContent, PortalAnchor } from 'web/styles/blocks/page'
import { PORTAL_TYPE } from 'web/constants'

import Notifications from './notifications'
import Router from './Router'
import Footer from './Footer'
import Modal from './Modal'
import Navbar from './Navbar'

export const Content = () => {
  const pathname = useSelector(({ router }: any) => router.location.pathname)
  const isUserLogged = useSelector(({ app }: any) => app.isUserLogged)

  const hasNavbar = useMemo(() =>
    !pathname.startsWith(`/${API.RESOURCES_PREFIX}/`) && isUserLogged
  , [pathname, isUserLogged])

  return (
    <>
      <PortalAnchor id={PORTAL_TYPE.TOOLTIPS} />
      <Modal />
      <PageContent withNavbar={hasNavbar}>
        <Navbar />
        <Notifications />
        <Router />
      </PageContent>
      <Footer />
    </>
  )
}
