import styled, { css } from 'styled-components'

import { COLORS } from '../../constants'

export const clickableStyle = css`
  :hover {
    cursor: pointer;
    opacity: 1;
  }
`

export const SvgIcon = styled.div`
  & svg {
    width: 100%;
    height: 100%;
  }
`

export const MiniInputWrapper = styled.div<{ active: boolean }>`
  background: ${COLORS.THEME_BACK};
  align-items: center;
  border: 1px solid ${props => props.active ? COLORS.BORDER_ACTIVE : COLORS.BORDER};
  border-radius: 3px;
  box-sizing: border-box;
  color: ${COLORS.FONT};
  font-size: 14px;
  position: relative;
  max-width: 400px;
  display: inline-flex;
  flex-direction: row;
  height: 29px;
  
  & input {
    font-size: .9em;
  }
`

export const EditableFieldWrapper = styled.div<{ editing: boolean }>`
  position: relative;
  max-width: 100%;
  
  ${props => !props.editing && clickableStyle}
`

export const EditableLabelBox = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  font-weight: 400;
  user-select: none;
  
  :focus {
    outline: none;
  }
`

export const EditableLabel = styled.div<{ clickable: boolean }>`
  ${props => props.clickable
  ? clickableStyle
  : 'filter: grayscale(100%);'}
`

export const EditableFieldIcon = styled(SvgIcon)<{ iconRight?: number; centered: boolean }>`
  position: absolute;
  top: -10px;
  right: ${props => props.iconRight ?? -22}px;
  width: 15px;
  height: ${props => props.centered ? '100%' : '15px'};
  color: ${COLORS.FONT};
  opacity: .4;
`
