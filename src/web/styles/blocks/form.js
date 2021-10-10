import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'

export const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  padding: 0 50px;
  flex-direction: column;
  min-width: 550px;
  position: relative
`

export const FormHeaderPhoto = styled.img`
  object-fit: cover;
  margin: auto;
  width: 150px;
  height: 150px;
  display: flex;
  border-radius: 100%;
`

export const FormHeaderTitle = styled.h1`
  font-weight: 800;
  font-size: 2.2em;
  display: flex;
  margin: 15px 5px 0;
  justify-content: center;
  align-content: center;
  
  > * input {
    width: 250px;
  }
`

export const FormHeaderLeftPanel = styled.div`
  position: absolute;
  left: 50px;
  top: 0;
`

export const FormHeaderRightPanel = styled.div`
  position: absolute;
  right: 50px;
  top: 0;
`

export const InputRow = styled.div`
  margin: 0 ${props => props.fixedPadding ? '42px' : 'auto'} 6px;
  position: relative;
  min-height: ${props => props.isSmall ? 22 : 38}px;
`

export const InputWrapper = styled.div`
  background: ${COLORS.THEME_BACK};
  align-items: center;
  border: 1px solid ${props => props.active ? COLORS.BORDER_ACTIVE : COLORS.BORDER};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${COLORS.FONT};
  font-size: 14px;
  position: relative;
  width: 100%;
  max-width: 400px;
  display: inline-flex;
  flex-direction: row;
`

export const TextInputBox = styled.label`
  height: ${props => props.lineHeight ?? 36}px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  font-weight: 400;
  flex: 1 0 0;
  display: flex;
`

export const TextInputValue = styled.span`
  color: ${COLORS.GREY_PRIMARY};
  font-size: 12px;
  height: ${props => props.lineHeight ?? 36}px;
  left: 8px;
  line-height: ${props => props.lineHeight ?? 36}px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform-origin: left;
  right: 0;
  user-select: none;
  transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  
  ${props => props.shrunken && (props.miniInput
    ? { display: 'none' }
    : { transform: 'scale(.83333) translateY(-13px)' }
  )}
`

export const TextInputField = styled.input`
  background: ${COLORS.THEME_BACK};
  color: ${COLORS.FONT};
  overflow: hidden;
  padding: ${props => props.shrunken && !props.miniInput ? '12px 8px 2px' : '9px 8px 7px'};
  text-overflow: ellipsis;
  margin: 0;
  border: 0;
  width: 100%;
  
  &:active, &:focus {
    outline: 0;
  }
`

export const TextAreaRow = styled.div`
  display: flex;
  margin: 0 auto 6px;
  position: relative;
  min-height: 38px;
`

export const TextAreaBox = styled.label`
  height: fit-content;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  font-weight: 400;
  flex: 1 0 0;
  display: flex;
`

export const TextAreaValue = styled.span`
  color: ${COLORS.GREY_PRIMARY};
  font-size: 12px;
  height: 36px;
  left: 8px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  transform-origin: left;
  right: 0;
  user-select: none;
  transition: transform ease-out .1s, -webkit-transform ease-out .1s;
  
  ${props => props.shrunken && { transform: 'scale(.83333) translateY(-11px)' }}
`

export const TextAreaField = styled.textarea`
  background: ${COLORS.THEME_BACK};
  color: ${COLORS.FONT};
  padding: ${props => props.shrunken && !props.miniInput ? '16px 8px 2px' : '11px 8px 7px'};
  margin: 0;
  border: 0;
  width: 100%;
  min-width: 150px;
  max-height: -webkit-fill-available;
  
  &:active, &:focus {
    outline: 0;
  }
`

export const TextAreaErrorWrapper = styled.div`
  position: absolute;
  top: -12px;
  right: -11px;
  z-index: 10;
`

export const InputSiderWrapper = styled.div`
  align-items: center;
  height: 100%;
  margin-right: 8px;
  vertical-align: middle;
  display: flex;
`

export const ShowPassWrapper = styled.div`
  margin-left: 8px;
  align-items: stretch;
`

export const ShowPassButton = styled.button`
  outline: 0;
  border: 0;
  background-color: transparent;
  color: ${COLORS.FONT};
  display: inline;
  padding: 0;
  position: relative;
  font-weight: 600;
  text-align: center;
  user-select: none;
  width: auto;

  ${clickableStyle}
  &:active {
    opacity: .7;
  };
`

export const PhotoInputWrapper = styled(InputWrapper)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: auto;
  display: flex;
  margin-bottom: ${props => props.size / 8}px;
  border-radius: ${props => props.hasPreview ? '50%' : '0'};
`

export const PaddedInputWrapper = styled.div`
  position: relative;
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  border-radius: 1px;  
  box-sizing: border-box;
  display: inline-block;
  float: ${props => props.alignLeft ? 'left' : 'right'};
  margin: ${props => props.alignLeft ? '0 15px 0 0' : '0 0 0 15px'};
`

export const BoolInputBox = styled.label`
  height: ${props => props.isSmall ? 20 : 36}px;
  width: ${props => props.isSmall ? 20 : 36}px;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
  color: ${COLORS.GREEN_PRIMARY};
  background-color: ${COLORS.THEME_BACK};

  ${clickableStyle}
  &:hover {
    color: ${COLORS.GREEN_SECONDARY};
  }
`

export const BoolInputMessage = styled.span`
  font-weight: 500;
  display: inline-block;
  line-height: ${props => props.isSmall ? 21 : 34}px;
  font-size: ${props => props.isSmall ? 1 : 1.2}em;
`

export const BoolInputLabel = styled.span`
  position: absolute;
  padding: ${props => props.isSmall ? '0 2px' : '0 4px'};
  width: fill-available;
  height: 100%;
  user-select: none;
  
  & svg {
    height: 100%;
    width: 100%;
    display: block;
  }
`

export const BoolInputField = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: 0;
  
  &:active, &:focus {
    outline: 0;
  }
`

export const FileInputBox = styled.label`
  height: 100%;
  width: 100%;
  position; relative;
  display: flex;
  padding: 0;
  margin: 0;
  min-width: 0;
  
  &:hover svg {
    color: ${COLORS.BLUE_SECONDARY};
  }
  
  &:active svg {
    opacity: .7;
  }
`

export const FileInputLabel = styled.div`
  width: 100%;
  user-select: none;
  display: flex;
  flex-flow: column;
  text-align: center;
  align-self: center;
  
  & svg {
    margin: auto;
    font-size: 50px;
    color: ${COLORS.BLUE_PRIMARY};
  }
`

export const FileInputField = styled.input`
  background: ${COLORS.THEME_BACK};
  color: ${COLORS.FONT};
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 0 auto;
  
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: 0;

  ${clickableStyle}
  :hover {
    opacity: 0;
  }
  &:active, &:focus {
    outline: 0;
  }
`

export const FileInputPreview = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('${props => props.file}')
`

export const FileImagePreview = styled.img`
  max-width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  display: block;
`

export const SwitchInputBox = styled.label`
  height: 36px;
  width: fit-content;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
  flex: 1 0 0;
  display: flex;
  background-color: ${COLORS.THEME_BACK};
`

export const SwitchInputLabel = styled.div`
  display: flex;
  height: 100%;
  user-select: none;
`

export const SwitchInputValue = styled.span`
  display: flex;
  flex-flow: row;
  font-size: 1em;
  font-weight: 500;
  padding: 0 15px;
  height: 100%;
  align-items: center;
  text-transform: uppercase;
  ${props => props.selected
    ? `
      background-color: ${COLORS.GREEN_SECONDARY};
      color: ${COLORS.THEME_FRONT};
      opacity: 1;
    ` : `
      opacity: 0.5;
      ${clickableStyle}
    `
}
  
  :not(:last-child) {
    border-right: 1px solid ${COLORS.BORDER};
  }
`

export const FormButtonWrapper = styled.div`
  margin: ${props => props.margin};
  display: ${props => props.inline ? 'inline-block' : 'block'};

  min-width: 100px;
  align-content: stretch;
`

export const FormButton = styled.button`
  border: ${props => props.border ? `1px solid ${COLORS.BORDER}` : 'none'};
  background-color: ${props => props.background};
  border-radius: 4px;
  color: ${props => props.color};
  position: relative;
  box-sizing: border-box;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  user-select: none;
  width: 100%;
  max-width: 400px;
  height: 32px;

  ${props => props.disabled && `
    opacity: .4;
    pointer-events: none;
  `}

  &:active {
    opacity: .7;
  }

  &:focus {
    outline: 0;
  }
  
  ${clickableStyle}
  &:hover {
    background-color: ${props => props.backgroundHover};
  }
`

export const MiniFormButtonWrapper = styled.div`
  margin: ${props => props.margin || '0 auto'};
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: fit-content;
  align-content: stretch;
`

export const MiniFormButton = styled(FormButton)`
  height: 24px;
`

export const FormButtonContentWrapper = styled.span`
  position: relative;
  top: -2px;
`

export const SeparatorWrapper = styled.div`
  margin: 10px auto 10px;
  flex-direction: row;
  display: flex;
  max-width: 750px;
`

export const SeparatorLine = styled.div`
  background-color: ${COLORS.BORDER};
  height: 1px;
  position: relative;
  top: .45em;
  flex-shrink: 1;
  flex-grow: 1;
`

export const SeparatorText = styled.div`
  color: ${COLORS.GREY_PRIMARY};
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  margin: 0 18px;
  text-transform: uppercase;
`

export const IconSpan = styled.span`
  height: 18px;
  width: 18px;
  display: inline-block;
  margin-right: 8px;
  position: relative;
  top: 3px;
  ${props => props.currentColor && `color: ${props.currentColor}`};

  > svg {
    width: 100%;
    height: 100%;
  }
`

export const ErrorSpan = styled.span`
  height: 22px;
  width: 22px;
  display: block;
  position: relative;
  
  > * svg {
    fill: ${COLORS.ERROR};
  }
`

export const InputLabel = styled.span`
  font-weight: 500;
  padding-top: 10px;
  display: inline-block;
  font-size: 1.2em;
  vertical-align: top;
`

export const InputPlaceholder = styled.span`
  font-weight: 500;
  padding-top: 10px;
  margin-left: 40px;
  position: absolute;
  white-space: nowrap;
`

export const RemoveFileButton = styled.div`
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 5;
  color: ${COLORS.FONT};
  opacity: .8;

  ${clickableStyle}
`

export const PhotoPreviewBlock = styled.div`
  position: absolute;
  bottom: -${props => props.size / 3}px;
  right: -${props => props.size / 2}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 100%;
  border: 1px solid ${COLORS.BORDER};
  overflow: hidden;
`

export const PhotoPreview = styled.img`
  height: 100%;
  width: 100%;
  background-color: ${COLORS.THEME_FRONT};
`
