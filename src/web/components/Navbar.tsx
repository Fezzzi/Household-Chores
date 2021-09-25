import React, { useMemo } from 'react'
import styled from 'styled-components'

import LogoSvg from 'assets/icons/logo.svg'

import { API, PROFILE_TABS, SETTING_CATEGORIES } from 'shared/constants'
import { AUTH } from 'shared/constants/localeMessages'
import { COLORS } from 'web/constants'
import { BellIcon, LogOutIcon } from 'web/styles/icons'
import { LogoIcon } from 'web/styles/blocks/page'
import { clickableStyle, SvgIcon } from 'web/styles/blocks/common'
import { useSelector } from 'web/helpers/useTypedRedux'

import { Link } from './common'

export const Navbar = () => {
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)
  const [signoutLabel, activityLabel] = useMemo(() =>
    [applicationTexts[AUTH.SIGN_OUT], applicationTexts[AUTH.SIGN_OUT]]
  , [applicationTexts])

  const isUserLogged = useSelector(({ app: { isUserLogged } }) => isUserLogged)
  const userPhoto = useSelector(({ app: { user: { photo } } }) => photo)
  const hasActivity = useSelector(({ app: { activityFeed } }) => activityFeed.length > 0)

  return isUserLogged
    ? (
      <NavbarWrapper>
        <Link route="/">
          <NavbarLogo><LogoSvg /></NavbarLogo>
        </Link>
        <NavbarName>
          <Link route="/">HOUSEHOLD APP</Link>
        </NavbarName>
        <NavbarBellIcon highlighted={hasActivity} title={activityLabel}>
          <BellIcon />
        </NavbarBellIcon>
        <Link route={`${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}?tab=${PROFILE_TABS.GENERAL}`}>
          <NavbarUserImage src={userPhoto} alt="user" />
        </Link>
        <NavbarIcon title={signoutLabel} highlightHover><LogOutIcon /></NavbarIcon>
      </NavbarWrapper>
    ) : null
}

const NavbarWrapper = styled.div`
  top: 0;
  width: calc(100% - 80px);
  height: 60px;
  padding: 0 40px;
  background-color: ${COLORS.THEME_FRONT};
  z-index: 10;
  display: flex;
  flex-flow: row;
  align-items: center;
  position: fixed;
  box-shadow: 0 4px 10px -10px ${COLORS.FONT};
`

const NavbarLogo = styled(LogoIcon)`
  width: 50px;
  height: 50px;

  ${clickableStyle}
`

const NavbarName = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin: 0 auto 0 8px;

  ${clickableStyle}
`

const NavbarUserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 20px;

  ${clickableStyle}
`

const NavbarIcon = styled(SvgIcon)<{ highlightHover?: boolean }>`
  width: 24px;
  height: 24px;
  position: relative;

  & svg {
    opacity: 0.7;
  }

  ${clickableStyle}
  :hover {
    ${({ highlightHover }) => highlightHover && `color: ${COLORS.RED_SECONDARY};`}

    & svg {
      opacity: 1;
    }
  }
`

const NavbarBellIcon = styled(NavbarIcon)<{ highlighted: boolean }>`
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
