import React, { useState, createElement, MouseEvent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { COLORS, PORTAL_TYPE } from 'web/constants'
import { clickableStyle, SvgIcon } from 'web/styles/blocks/common'

import { LocaleText } from '../../common'

interface FloatingIconProps {
  message: string
  background?: string
  enabled?: boolean
  sending?: boolean
  icon: React.FC
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const FloatingIcon = ({
  message,
  icon,
  background = COLORS.BLUE_PRIMARY,
  sending = false,
  enabled = true,
  onClick,
}: FloatingIconProps) => {
  const [hovered, setHovered] = useState(false)

  const floatingUIRoot = document.getElementById(PORTAL_TYPE.FLOATING_UI)
  if (floatingUIRoot == null) {
    return null
  }

  return ReactDOM.createPortal((
    <FloatingIconWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      background={background}
      enabled={!sending && enabled}
      onClick={e => {
        if (sending || !enabled || onClick == null) {
          return
        }
        onClick(e)
      }}
    >
      <IconWrapper>{createElement(icon)}</IconWrapper>
      {(hovered || sending) && (
        <TextWrapper>
          <LocaleText message={message} />
        </TextWrapper>
      )}
    </FloatingIconWrapper>
  ), floatingUIRoot)
}

const FloatingIconWrapper = styled.div<{ background: string; enabled: boolean }>`
  top: 72px;
  right: 12px;
  height: 36px;
  background-color: ${props => props.background};
  color: ${COLORS.LIGHT_PRIMARY};
  position: absolute;
  display: flex;
  border-radius: 19px;
  padding: 2px;
  z-index: 25;
  opacity: ${props => props.enabled ? 1 : 0.8};
  
  ${props => props.enabled && clickableStyle}
`

const IconWrapper = styled(SvgIcon)`
  width: 28px;
  height: 28px;
  padding: 4px;
  display: inline-flex;
`

const TextWrapper = styled.span`
  display: inline-flex;
  line-height: 34px;
  font-size: 1.3em;
  padding-right: 6px;
  font-weight: 500;
  user-select: none;
`
