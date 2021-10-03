import styled from 'styled-components'

import { COLORS } from 'web/constants'

export const PageWrapper = styled.section`
  background-color: ${COLORS.THEME_BACK};
  color: ${COLORS.FONT};
  min-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`

export const PortalAnchor = styled.div`
  height: 0;
  width: 100%;
  position: relative;
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
