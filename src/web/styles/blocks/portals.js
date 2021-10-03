import styled from 'styled-components'

import { COLORS } from '../../constants'
import { clickableStyle } from './common'

export const TooltipWrapper = styled.div`
  position: relative;
  
  :focus, :active {
    outline: none;
  }
`

export const OptionsTooltipIcon = styled.span`
  opacity: ${props => props.active ? 0.9 : 0.6};
  
  ${clickableStyle}
  :hover {
    opacity: 0.9;
  }
  
  :focus, :active {
    outline: none;
  }
`

export const TooltipAnchor = styled.div`
  position: absolute;
  z-index: 10;
  top: ${props => props.position?.y ? props.position.y + 2 : 180}px;
  left: ${props => props.position?.x ?? 1400}px;
`

export const Tooltip = styled.div`
  top: ${props => props.customOffsetY ?? -3}px;
  right: ${props => props.withHover ? 150 : 125}%;
  width: max-content;
  height: ${props => props.customHeight ? props.customHeight : 'inherit'};
  line-height: ${props => props.customLineHeight ? props.customLineHeight : 'inherit'};
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  position: absolute;
  padding: ${props => props.hasRows ? 0 : '4px 6px'};
  user-select: none;
  font-weight: 400;
  word-break: break-all;

  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
  
  ${props => props.withArrow && `
    ::after {
      content: "";
      position: absolute;
      top: ${props.arrowTop ? '14px' : '54%'};
      left: 100%;
      margin-top: -5px;
      border: 5px solid;
      border-color: transparent transparent transparent ${COLORS.BORDER};
    }
  `}
  
  :focus {
    outline: none;
  }
`

export const TooltipRow = styled.div`
  padding: 6px 11px;
  margin-bottom: -4px;
  opacity: ${props => props.clickable ? 0.85 : 0.5};
  
  ${props => props.selected && `
    opacity: 1;
    font-weight: 500;
    background-color: ${COLORS.THEME_BACK};
  `}

  ${props => props.clickable
    ? `
      ${clickableStyle}
      :hover {
        font-weight: 400;
        background-color: ${COLORS.THEME_BACK};
      }
    ` : 'filter: grayscale(100%);'
}
  
  ${props => props.withArrow && `
    :first-child {
      ::after {
        content: "";
        position: absolute;
        top: 10px;
        left: 100%;
        border: 5px solid;
        border-color: transparent transparent transparent ${COLORS.BORDER};
      }
    }
  `}
  
  :last-child {
    margin-bottom: 0;
  }
`

export const InputHintAnchor = styled.div`
  position: relative;
  color: ${COLORS.FONT}
`

export const InputHintWrapper = styled.div`
  position: absolute;
  top: -10px;
  left: -14px;
  z-index: 10;
  width: 20px;
`

export const InputHintIcon = styled.div`
  opacity: 0.6;
  height: 15px;
  width: 15px;
  float: right;
    
  > svg {
    width: 100%;
    height: 100%;
  }

  ${clickableStyle}
`
