import React, { useMemo } from 'react'
import styled from 'styled-components'

import { API } from 'shared/constants'
import { PORTAL_TYPE } from 'web/constants'
import { PortalAnchor } from 'web/styles/blocks/page'
import { useSelector } from 'web/helpers/useTypedRedux'

import Notifications from './notifications'
import Router from './Router'
import { Footer } from './Footer'
import Modal from './Modal'
import { Navbar } from './Navbar'

export const Content = () => {
  const pathname = useSelector(({ router }) => router.location.pathname)
  const isUserLogged = useSelector(({ app }) => app.isUserLogged)

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

const PageContent = styled.main<{ withNavbar: boolean }>`
  display: flex;
  flex-grow: 1;
  ${props => props.withNavbar && `
    padding-top: 60px;
    min-height: calc(100vh - 98px);
    max-height: calc(100vh - 98px);
  `}
`
