import React from 'react'
import {PowerSettingsNew} from '@material-ui/icons'
import {
    NavbarIcon,
    NavbarLogOut,
    NavbarName,
    NavbarPic,
    NavbarUserImage,
    NavbarWrapper
} from 'clientSrc/styles/blocks/navbar'

const Navbar = () => (
    <NavbarWrapper>
        <NavbarIcon/>
        <NavbarName> HOUSEHOLD APP </NavbarName>
        <NavbarUserImage/>
        <NavbarLogOut> <PowerSettingsNew/> </NavbarLogOut>
    </NavbarWrapper>

)

export default Navbar
