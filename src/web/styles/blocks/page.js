import styled from 'styled-components'

import { COLORS } from 'web/constants'

export const ThemeWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const PageWrapper = styled.section`
  background-color: ${COLORS.THEME_BACK};
  color: ${COLORS.FONT};
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  scrollbar-color: ${COLORS.GREY_PRIMARY} transparent;
  scrollbar-width: thin;
  
  > * div {
    scrollbar-width: thin;
  }
  
  > * img {
    user-select: none;
    object-fit: cover;
  }
  
  > * ::-webkit-scrollbar, ::-webkit-scrollbar {
    appearance: none;
    width: 4px;
    height: 4px;
  }
  
  > * ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb {
    appearance: none;
    background-color: ${COLORS.GREY_PRIMARY};
    border-radius: 5px;
  }
  
  > * input:-webkit-autofill {
    background-color: inherit;
  }
`

export const PortalAnchor = styled.div`
  height: 0;
  width: 100%;
  position: relative;
`

export const PageFooter = styled.footer`
  padding: 0 20px;
  background-color: ${COLORS.THEME_BACK};
`

export const FooterWrapper = styled.div`
  max-width: 1012px;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  margin: 0 auto;
  text-transform: uppercase;
  width: 100%;
`

export const CopyrightRow = styled.span`
  color: ${COLORS.GREY_PRIMARY};
`

export const LogoIcon = styled.div`
  & svg {
    height: 100%;
    width: 100%;

    & #logo-body ellipse,
    & #logo-body line,
    & #logo-body path,
    & #logo-body rect {
      stroke: ${COLORS.FONT};
    }

    & #logo-roof line,
    & #logo-roof path,
    & #logo-roof rect {
      stroke: ${COLORS.RED_SECONDARY};
    }
  }
`
