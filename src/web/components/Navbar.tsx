import React, { useCallback, useMemo, useRef, useState, FocusEvent } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import LogoSvg from 'assets/icons/logo.svg'

import { API, PROFILE_TABS, SETTING_CATEGORIES } from 'shared/constants'
import { AUTH, FORM } from 'shared/constants/localeMessages'
import { COLORS } from 'web/constants'
import { AuthActions } from 'web/actions'
import { BellIcon, LogOutIcon } from 'web/styles/icons'
import { LogoIcon } from 'web/styles/blocks/page'
import { clickableStyle, SvgIcon } from 'web/styles/blocks/common'
import { useSelector } from 'web/helpers/useTypedRedux'

import { Link } from './common'
import { FloatingActivityFeed } from './portals'

export const Navbar = () => {
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)
  const [signoutLabel, activityLabel] = useMemo(() =>
    [applicationTexts[AUTH.SIGN_OUT], applicationTexts[FORM.NOTIFICATIONS]] as [string, string]
  , [applicationTexts])

  const isUserLogged = useSelector(({ app: { isUserLogged } }) => isUserLogged)
  const userPhoto = useSelector(({ app }) => app.user.photo)
  const hasActivity = useSelector(({ app: { activityFeed } }) => activityFeed.length > 0)

  const dispatch = useDispatch()
  const handleSignOutClick = useCallback(() => {
    dispatch(AuthActions.signOut())
  }, [dispatch])

  const [notificationsExpanded, setNotificationsExpanded] = useState<boolean>(false)
  const bellButtonRef = useRef<HTMLDivElement>(null)

  const handlePanelBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    if (e.relatedTarget === bellButtonRef.current) {
      return false
    }
    setNotificationsExpanded(false)
  }, [setNotificationsExpanded, bellButtonRef.current])

  return isUserLogged
    ? (
      <NavbarWrapper>
        <Link route="/">
          <NavbarLogo><LogoSvg /></NavbarLogo>
        </Link>
        <NavbarName>
          <Link route="/">HOUSEHOLD APP</Link>
        </NavbarName>

        <NavbarBellIcon
          highlighted={hasActivity}
          title={activityLabel}
          ref={bellButtonRef}
          tabIndex={-1}
          onClick={() => setNotificationsExpanded(prevState => !prevState)}
        >
          <BellIcon />
        </NavbarBellIcon>
        <NavbarUserImage>
          <Link route={`${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}?tab=${PROFILE_TABS.GENERAL}`}>
            <img src={userPhoto} alt="user" />
          </Link>
        </NavbarUserImage>
        <NavbarIcon title={signoutLabel} highlightHover onClick={handleSignOutClick}>
          <LogOutIcon />
        </NavbarIcon>

        {notificationsExpanded && <FloatingActivityFeed onBlur={handlePanelBlur} />}
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
  border-bottom: 1px solid ${COLORS.BORDER};
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
  user-select: none;

  ${clickableStyle}
`

const NavbarUserImage = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 20px;

  & img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  ${clickableStyle}
`

const NavbarIcon = styled(SvgIcon)<{ highlightHover?: boolean }>`
  width: 24px;
  height: 24px;

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
