import styled from 'styled-components'

import { FormHeaderLeftPanel, FormHeaderRightPanel } from 'clientSrc/styles/blocks/form'

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
  width: max-content;
`

export const InvitationFormNode = styled.div`
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: 80px;
  padding: 5px 3px;
`

export const InvitationFormNodePhoto = styled.img`
  width: 50px;
  height: 50px;
  margin: auto;
  border-radius: 100%;
  display: flex;
`

export const InvitationFormNodeName = styled.div`
  margin: auto;
  font-weight: 600;
  font-size: 1.4em;
  display: flex;
  width: fit-content;
  padding: 10px;
  word-break: break-all;
`
