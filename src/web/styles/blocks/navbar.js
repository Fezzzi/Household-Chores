import styled from 'styled-components'

import { COLORS } from 'web/constants'

import { LogoIcon } from './page'

export const NavbarWrapper = styled.div`
  top: 0;
  width: calc(100% - 80px);
  height: 60px;
  padding: 0 40px;
  color: ${COLORS.FONT};
  background-color: ${COLORS.THEME_FRONT};
  z-index: 10;
  display: flex;
  flex-flow: row;
  align-items: center;
  position: fixed;
  box-shadow: 0 4px 10px -10px ${COLORS.FONT};
`

export const NavbarLogo = styled(LogoIcon)`
  width: 50px;
  height: 50px;

  :hover {
    cursor: pointer;
  }
`

export const NavbarName = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin: 0 auto 0 8px;

  :hover {
    cursor: pointer;
  }
`

export const NavbarUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 20px;

  :hover {
    cursor: pointer;
  }
`

export const NavbarIcon = styled.div`
  width: 24px;
  height: 24px;
  position: relative;

  & svg {
    width: 100%;
    height: 100%;
    opacity: 0.7;
  }

  :hover {
    cursor: pointer;
    ${props => props.highlightHover && `color: ${COLORS.RED_SECONDARY};`}

    & svg {
      opacity: 1;
    }
  }
`

export const NavbarBellIcon = styled(NavbarIcon)`
  :after {
    ${props => props.highlighted && `
      position: absolute;
      top: -5px;
      right: 2px;
      width: 4px;
      height: 4px;
      color: ${COLORS.RED_SECONDARY};
      content: '*';
      font-weight: 900;
      font-size: 22px;
    `}
  }
`
