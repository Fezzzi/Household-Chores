import React from 'react'

import {
  NavbarIcon,
  NavbarLogOut,
  NavbarName,
  NavbarPic,
  NavbarUserImage,
  NavbarWrapper,
} from 'client/styles/blocks/navbar'
import { LogOutIcon } from 'client/styles/icons'

const Navbar = () => (
  <NavbarWrapper>
    <NavbarIcon />
    <NavbarName> HOUSEHOLD APP </NavbarName>
    <NavbarUserImage />
    <NavbarLogOut><LogOutIcon /></NavbarLogOut>
  </NavbarWrapper>

)

export default Navbar
