import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 14px 40px;
`

export const EmptyContentMessage = styled.h3`
  text-align: center;
`

export const MessageLink = styled.span`
  color: ${COLORS.BLUE_PRIMARY};
  text-decoration: none;

  ${clickableStyle}
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
  color: ${props => props.textColor};
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
  bottom: 0;
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

  ${clickableStyle}
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
