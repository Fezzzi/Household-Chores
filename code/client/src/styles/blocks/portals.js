import styled from 'styled-components'

import { COLORS } from 'clientSrc/constants'

export const TooltipWrapper = styled.div`
  position: relative;
  
  :focus, :active {
    outline: none;
  }
`

export const OptionsTooltipIcon = styled.span`
  opacity: ${props => props.active ? 0.9 : 0.6};
  
  :hover {
    cursor: pointer;
    opacity: 0.9;
  }
  
  :focus, :active {
    outline: none;
  }
`

export const TooltipAnchor = styled.div`
  position: absolute;
  top: ${props => props.position?.y ? props.position.y + 2 : 180}px;
  left: ${props => props.position?.x ?? 1400}px;
`

export const Tooltip = styled.div`
  top: ${props => props.customOffsetY ?? -3}px;
  right: ${props => props.withHover ? 150 : 125}%;
  width: max-content;
  height: ${props => props.customHeight ? `${props.customHeight}px` : 'inherit'};
  line-height: ${props => props.customHeight ? `${props.customHeight - 2}px` : 'inherit'};
  background-color: ${COLORS.THEME_FRONT};
  border: 1px solid ${COLORS.BORDER};
  position: absolute;
  padding: ${props => props.hasRows ? 0 : '4px 6px'};
  z-index: 10;
  user-select: none;
  font-weight: 400;
  
  ${props => props.withArrow && `
    ::after {
      content: "";
      position: absolute;
      top: 50%;
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
      :hover {
        cursor: pointer;
        font-weight: 400;
        opacity: 1;
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

export const SimpleFloatingElementWrapper = styled.div`
  top: 10px;
  right: 20px;
  height: 36px;
  background-color: ${props => props.background};
  color: ${COLORS.LIGHT_PRIMARY};
  position: absolute;
  display: flex;
  border-radius: 19px;
  padding: 2px;
  z-index: 25;
  opacity: ${props => props.enabled ? 1 : 0.8};
  
  :focus {
    outline: none;
  }
  
  ${props => props.enabled && `:hover {
    background-color: ${props.backgroundHovered};
    cursor: pointer;
  }`}
  
  :active, :focus {
    opacity: 0.8;
  }
`

export const FloatingElementIcon = styled.span`
  width: 28px;
  height: 28px;
  padding: 4px;
  display: inline-flex;
  position: relative;
  
  & svg {
    height: 100%;
    width: 100%;
  }
`

export const FloatingElementText = styled.span`
  display: inline-flex;
  line-height: 34px;
  font-size: 1.3em;
  padding-right: 6px;
  font-weight: 500;
  user-select: none;
  
`
