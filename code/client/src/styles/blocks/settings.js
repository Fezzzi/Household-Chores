import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'
import { FormHeaderLeftPanel, FormHeaderRightPanel } from 'clientSrc/styles/blocks/form'

export const SettingsWrapper = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  overflow: hidden;
  display: flex;
  padding: 15px 0 15px 20px;
`

export const ColumnWrapper = styled.div`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  height: calc(100% - 30px);;
  display: table-col;
  margin-right: 10px;
  color: ${COLORS.FONT};
`

export const SettingIcon = styled.div`
  margin-right: 10px;
  display: inline-block;
  top: 4px;
  position: relative;
  
  & svg {
    height: 20px;
  }
`

export const SettingText = styled.div`
  font-size: ${props => props.primary ? 1.17 : 1.10}em;
  line-height: ${props => props.primary ? 1.17 : 1.10}em;
  display: inline-block;
`

export const Column = styled.div`
  width: 100%;
  max-height: calc(100% - 14px);
  overflow-y: auto;
  background-color: ${COLORS.THEME_FRONT};
  padding: 14px 0 0;
  margin: 14px 0;
  user-select: none;
  border: 1px solid ${COLORS.BORDER};
`

export const SettingRow = styled.div`
  padding: 0 14px 14px 14px;
  opacity: ${props => props.selected ? 1 : 0.6};
  font-weight: ${props => props.selected ? 600 : 400};
  font-size: ${props => props.primary ? 1.17 : 1.10}em;
  line-height: ${props => props.primary ? 1.17 : 1.10}em;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
    font-weight: 600;
  }
`

export const ContentColumn = styled.div`
  width: 100%;
  min-height: calc(100% - 58px);
  max-height: calc(100% - 58px);
  background-color: ${COLORS.THEME_FRONT};
  padding: 14px;
  margin: 14px 20px 14px 0;
  border: 1px solid ${COLORS.BORDER};
  overflow-y: auto;
  overflow-x: hidden;
`

export const IconButtonWrapper = styled.div` 
  display: inline-block;
  float: right;
`

export const IconButton = styled.button`
  width: 38px;
  height: 38px;
  position: relative;
  padding: 8px;
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${props => props.active ? COLORS.BORDER_ACTIVE : COLORS.BORDER};
  border-radius: 1px;
  
  &:hover {
    cursor: pointer;
    background-color: ${COLORS.THEME_BACK};
  }
  
  &:active, &:focus {
    outline: none;
    border: 1px solid ${COLORS.BORDER_ACTIVE};
  }
  
  & > svg {
    fill: ${COLORS.FONT};
    stroke: none;
    width: 20px;
    height: 20px;
  }
`

export const LocaleSelector = styled.div`
  position: absolute;
  width: 71px;
  height: fit-content;
  top: -1px;
  right: 120%;
  padding-top: 8px;
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  border-radius: 1px;
  
  :hover {
    cursor: pointer;
    background-color: ${COLORS.THEME_BACK};
  }
`

export const LocaleLine = styled.div`
  padding: 0 8px 8px 8px;
  width: calc(100% - 16px);
  height: 20px;
`

export const LocaleIcon = styled.span`
  width: 22px;
  height: 22px;
  display: inline-block;
  float: left;
`

export const LocaleLabel = styled.span`
  line-height: 23px;
  font-weight: 600;
  float: right;
  font-size: 13px;
  color: ${COLORS.FONT};
`

export const SectionHeadline = styled.h2`
  font-size: 2em;
  font-weight: 700;
  margin: ${props => props.first ? 25 : 50}px 50px 25px;
  text-transform: capitalize;
`

export const SearchBarWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`

export const ProfileHeaderSubtitle = styled.div`
  width: 235px;
  margin-top: 20px;
  opacity: 0.8;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-content: center;
  
  > * input {
    width: 235px;
  }
`

export const ProfilePasswordBlock = styled(FormHeaderLeftPanel)`
  width: 235px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  
  > * input {
    width: 235px;
  }
`

export const ProfilePasswordInputs = styled.div`
  margin: 15px 10px 0;
`

export const ProfilePasswordClose = styled.div`
  position: absolute;
  top: -10px;
  left: -15px;
  opacity: .8;
  
  :hover {
    opacity: 1;
  }
`

export const ProfilePasswordIcon = styled.span`
  height: 50px;
  width: 50px;
  margin: auto;
  display: flex;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

export const ProfilePasswordTitle = styled.div`
  font-size: 1.4em;
  font-weight: 500;
  margin: 15px 0;
`

export const ProfileSwitchesBlock = styled(FormHeaderRightPanel)`
  flex-flow: column;
  display: flex;
  
  > div {
    padding-bottom: 5px;
  }
`

export const FormBody = styled.div`
   margin: 40px 100px 0;
`

export const NotificationGroupBox = styled.div`
  margin: 0 50px;
`
