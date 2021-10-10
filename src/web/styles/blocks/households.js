import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'
import { FormHeaderLeftPanel, FormHeaderRightPanel } from './form'

export const HouseholdSubtitle = styled.div`
  margin-top: 15px;
  opacity: 0.6;
  font-size: 0.9em;
  display: flex;
`

export const CriticalButtonsBlock = styled(FormHeaderRightPanel)`
  width: 170px;
  
  button {
    opacity: 0.7;
  }
  
  button:hover {
    opacity: 1;
  }
`

export const ButtonIconSpan = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 4px;
  overflow: hidden;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

export const CurrentUserBlock = styled(FormHeaderLeftPanel)`
  justify-content: center;
  align-items: center;
  width: 210px;
`

export const UserPhoto = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 100%;
  display: flex;
`

export const UserName = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 1.5em;
  display: flex;
  width: fit-content;
  padding: 10px;
  word-break: break-all;
`

export const UserLabel = styled.div`
  margin: 0 auto;
  width: fit-content;
  position: relative;
`

export const RoleLabel = styled.div`
  display: inline-block;
  background-color: ${props => props.background};
  color: ${props => props.color};
  padding: 0 8px;
  border-radius: 3px;
  text-transform: lowercase;
  width: fit-content;
  line-height: 18px;
  height: 20px;
  margin: 0 auto;;
`

export const InvitationNodesWrapper = styled.div`
  display: flex;
  width: max-content;
`

export const InvitationFormNode = styled.div`
  position: relative;
  display: inline-flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 110px;
  padding: 5px 3px;
  user-select: none;

  ${clickableStyle}
  &:hover {
    background-color: ${COLORS.LIGHT_PRIMARY};
  }
`

export const InvitationFormNodePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
`

export const InvitationFormNodeName = styled.span`
  font-weight: 600;
  font-size: 1.4em;
  display: flex;
  width: fit-content;
  text-align: center;
  padding: 10px 5px 0;
  word-break: break-word;
`

export const InvitationFormButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  font-weight: 600;
  color: ${COLORS.BLUE_PRIMARY};
  
  svg {
    width: 100%;
    height: 100%;
  }
`
