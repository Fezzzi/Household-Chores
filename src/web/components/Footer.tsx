import React from 'react'
import styled from 'styled-components'

import { COLORS } from 'web/constants'

export const Footer = () => (
  <PageFooter>
    <FooterWrapper>
      <CopyrightRow>
        © 2021 Filip Horký
      </CopyrightRow>
    </FooterWrapper>
  </PageFooter>
)

const CopyrightRow = styled.span`
  color: ${COLORS.GREY_PRIMARY};
`

const PageFooter = styled.footer`
  padding: 0 20px;
  background-color: ${COLORS.THEME_BACK};
`

const FooterWrapper = styled.div`
  max-width: 1012px;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  margin: 0 auto;
  text-transform: uppercase;
  width: 100%;
`
