import styled from 'styled-components'

import LogoImage from '~/static/icons/icon-150.png'

import {COLORS} from 'clientSrc/constants'

export const NavbarWrapper = styled.div`
  width: 100%;
  height: 70px;
  color: ${COLORS.RED_PRIMARY};
  background-color: ${COLORS.FONT};
  display: flex;
  flex-flow: row;
  position: fixed;
  box-shadow: ${COLORS.FONT} 5px;
`
export const NavbarWrapperScroll = styled.div`
  width: 100%;
  height: 40px;
  position: fixed;
  top: 0;
  color: ${COLORS.RED_PRIMARY};
  background-color: ${COLORS.FONT};
`
export const NavbarIcon = styled.div `
    width: 50px;
    height: 50px;
    background-size: contain;
    background-image: url(${LogoImage});
    background-repeat: no-repeat;
    margin-top: 10px;
    margin-left: 15px;
    padding-left: 10px;
   
    :hover {
        cursor: pointer;}    
 `
export const NavbarName = styled.div `
    height: 70px;
    width: 100%;
    font-weight: bold;
    font-size: 25px;
    margin-left: 10px;
    padding-top: 25px;
    
    :hover {
        cursor: pointer;
        }
`
export const NavbarUserImage = styled.img `
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-top: 7px;
    margin-right: 10px;
    border: 1px white solid;
    padding-right: 10px;
    
    :hover {
        cursor: pointer;
        }
`
export const NavbarLogOut = styled.div `
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-right: 15px; 
    
    & svg {
        width: 100%;
        height: 100%;
        display: flex;
        align-self: center;
        }
    
    :hover {
        cursor: pointer;
        color: ${COLORS.LIGHT_PRIMARY};
        }
`