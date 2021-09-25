import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'
import { FormHeaderLeftPanel, FormHeaderRightPanel } from './form'

export const SettingsWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 15px 0 15px 20px;
`

export const ColumnWrapper = styled.div`
  min-width: ${props => props.width};
  max-width: ${props => props.width};
  height: calc(100% - 20px);
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

  ${clickableStyle}
  &:hover {
    opacity: 0.8;
    font-weight: 600;
  }
`

export const ContentColumn = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(100% - 28px);
  max-height: calc(100% - 28px);
  background-color: ${COLORS.THEME_FRONT};
  padding: 14px 14px 0;
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

  ${clickableStyle}
  &:hover {
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

  ${clickableStyle}
  :hover {
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

export const SectionHeadlineNote = styled.div`
  float: right;
  user-select: none;
  font-size: 0.5em;
  font-weight: 500;
  text-transform: none;
  opacity: 0.8;
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

  ${clickableStyle}
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

export const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
`

export const FormBody = styled.div`
   height: 100%;
   margin: 30px 100px 0;
`

export const BottomFormButton = styled.div`
  margin: 0 auto;
  width: 250px;
`

export const NotificationGroupBox = styled.div`
  margin: 0 50px;
`

export const AboutApplicationText = styled.p`
  margin: 30px 100px;
  font-size: 1.1em;
  line-height: 1.2em;
`

export const ContributorsCentered = styled.div`
  margin: 30px 90px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Contributor = styled.a`
  width: 80px;
  height: 80px;
  margin: 0 -20px 5px 0;
  
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`

export const ContributorsMore = styled.div`
  width: 50px;
  float: right;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
  font-weight: 500;
  margin-left: 30px;
  opacity: 0.7;
  user-select: none;

  ${clickableStyle}
`

export const TeamList = styled.div`
  margin: 30px 100px 0;
  display: flex;
  flex-direction: column;
`

export const TeamMember = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
`

export const TeamMemberDescription = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 15px;
  width: 100%;
`

export const TeamMemberText = styled.p`
  width: fit-content;
  font-style: italic;
  font-size: 1.1em;
  text-align: justify;
  margin: 0 10px;
  position: relative;
  
  :before {
    position: absolute;
    top: -5px;
    left: -10px;
    font-size: 1.4em;
    content: open-quote;
  }

  :after {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 1.4em;
    content: close-quote;
  }
`
