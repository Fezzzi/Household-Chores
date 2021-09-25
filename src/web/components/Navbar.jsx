import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LogoSvg from 'assets/icons/logo.svg'

import { API, PROFILE_TABS, SETTING_CATEGORIES } from 'shared/constants'
import { AUTH } from 'shared/constants/localeMessages'
import {
  NavbarIcon,
  NavbarBellIcon,
  NavbarLogo,
  NavbarName,
  NavbarUserImage,
  NavbarWrapper,
} from 'web/styles/blocks/navbar'
import { BellIcon, LogOutIcon } from 'web/styles/icons'

const Navbar = () => {
  const history = useHistory()
  const handleHomeNavigation = () => history.push('/')
  const handleProfileNavigation = () => history.push(`${API.SETTINGS_PREFIX}/${SETTING_CATEGORIES.PROFILE}?tab=${PROFILE_TABS.GENERAL}`)

  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)
  const signoutLabel = useMemo(() => applicationTexts[AUTH.SIGN_OUT], [applicationTexts])

  const isUserLogged = useSelector(({ app: { isUserLogged } }) => isUserLogged)
  const userPhoto = useSelector(({ app: { user: { photo } } }) => photo)
  const hasActivity = useSelector(({ app: { activityFeed } }) => activityFeed.length > 0)

  return isUserLogged
    ? (
      <NavbarWrapper>
        <NavbarLogo onClick={handleHomeNavigation}><LogoSvg /></NavbarLogo>
        <NavbarName onClick={handleHomeNavigation}>HOUSEHOLD APP</NavbarName>
        <NavbarBellIcon highlighted={hasActivity}>
          <BellIcon />
        </NavbarBellIcon>
        <NavbarUserImage onClick={handleProfileNavigation} src={userPhoto} alt="user" />
        <NavbarIcon title={signoutLabel} highlightHover><LogOutIcon /></NavbarIcon>
      </NavbarWrapper>
    ) : null
}

export default Navbar
