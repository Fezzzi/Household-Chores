import styled, { css } from 'styled-components'

import { COLORS } from 'clientSrc/constants'
import { FormHeaderLeftPanel, FormHeaderRightPanel } from 'clientSrc/styles/blocks/form'

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px 40px;
`

export const EmptyContentMessage = styled.h3`
  text-align: center;
`

export const HouseholdSwitchPhotoBox = styled.div`
  position: relative;
`

export const HouseholdSwitchSettingsLink = styled.div`
  position: absolute;
  z-index: 5;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  opacity: 0.5;
  
  > svg {
    width: 100%;
    height: 100%;
  }
  
  :hover {
    opacity: 1;
    cursor: pointer;
  }
`

const arrow = css`
  top: inherit;
  display: flex;
  flex-flow: row;
  align-items: center;
  width: 84px;
  height: 60px;
  opacity: 0.1;
  user-select: none;
  transition: opacity 0.5s ease 0s;
  
  :hover {
    opacity: 1;
    cursor: pointer;
    
    > img {
      width: 50px;
      height: 50px;
      margin: 5px;
    }
  }
  
  > svg {
    width: 20px;
    height: 30px;
  }
`

export const ToggleLeftArrow = styled(FormHeaderLeftPanel)`
  ${arrow}
  justify-content: flex-start;
`

export const ToggleRightArrow = styled(FormHeaderRightPanel)`
  ${arrow}
  justify-content: flex-end;
`

export const ArrowHouseholdPreview = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
  border-radius: 50%;
  transition: width 0.4s ease 0s, height 0.4s ease 0s, margin 0.4s ease 0s;
`

export const MessageLink = styled.span`
  color: ${COLORS.BLUE_PRIMARY};
  text-decoration: none;
  cursor: pointer;

  &:active {
    opacity: .7;
  }
`

export const ExpandableMemberListBox = styled.div`
  display: flex;
  justify-content: center;
`

export const ExpandableMemberList = styled.div`
  width: calc(100% - 100px);
  max-width: 600px;
  position: relative;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px 50px 35px;
`

export const HouseholdMemberNode = styled.span`
  position: relative;
  height: 25px;
  display: flex;
  flex-flow: row;
  padding: 2px 5px;
  margin: 5px;
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${props => props.borderColor};
  border-radius: 5px;
  user-select: none;
  
  :hover {
    border-radius: 5px 0 5px 5px;
  
    > div {
      opacity: 1;
    }
  }
`

export const HouseholdMemberRole = styled.div`
  position: absolute;
  z-index: 5;
  height: 8px;
  line-height: 7px;
  font-size: 0.7em;
  font-weight: 600;
  padding: 1px 4px;
  top: -10px;
  right: -1px;
  background-color: ${props => props.background};
  color: ${props => props.color};
  border-radius: 5px 0 0 0;
  opacity: 0;
  user-select: none;
  text-transform: lowercase;
  transition: opacity 0.4s ease 0s;
  
  :hover {
    opacity: 1;
  }
`

export const HouseholdMemberPhoto = styled.span`
  width: 25px;
  height: 25px;
  
  > img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`

export const HouseholdMemberName = styled.span`
  line-height: 25px;
  font-size: 1.1em;
  font-weight: 600;
  padding: 0 10px;
`

export const ExpandMemberListButton = styled.div`
  position: absolute;
  bottom: 0px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 5;
  background-color: ${COLORS.BLUE_PRIMARY};
  color: ${COLORS.THEME_FRONT};
  opacity: 0.4;
  
  > svg {
    width: 75%;
    height: 75%;
  }
  
  :hover {
    cursor: pointer;
    opacity: 1;
  }
  
  :active, :focus {
    outline: none;
  }
`

export const HouseholdBodyBox = styled.div`
  position: relative;
  background-color: ${COLORS.THEME_FRONT};
  padding: 14px;
  margin: 14px 0;
  border: 1px solid ${COLORS.BORDER};
  overflow-y: auto;
  overflow-x: hidden;
`
