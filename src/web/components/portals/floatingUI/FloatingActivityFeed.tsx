import React, { FocusEvent, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { COLORS, PORTAL_TYPE } from 'web/constants'

import { ActivityFeed } from './ActivityFeed'

interface FloatingActivityFeedProps {
  onBlur: (e: FocusEvent<HTMLElement>) => void
}

export const FloatingActivityFeed = ({ onBlur }: FloatingActivityFeedProps) => {
  const floatingUIRoot = document.getElementById(PORTAL_TYPE.FLOATING_UI)
  const panelRef = useRef<HTMLDivElement | null>()
  const handleBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    if (e.relatedTarget instanceof Node && panelRef.current?.contains(e.relatedTarget)) {
      return false
    }

    onBlur(e)
  }, [onBlur, panelRef.current])

  if (floatingUIRoot == null) {
    return null
  }

  // todo: Add endpoint for feed loading supporting paging, mark feed as read when queried with this endpoint,
  //  trigger endpoint when feed panel is unwrapped, implement infinite scroll within the panel
  return ReactDOM.createPortal((
    <FloatingPanelWrapper tabIndex={-1} ref={el => {
      el?.focus()
      panelRef.current = el
    }} onBlur={handleBlur}>
      <ActivityFeed />
    </FloatingPanelWrapper>
  ), floatingUIRoot)
}

const FloatingPanelWrapper = styled.div`
  position: absolute;
  top: 72px;
  right: 12px;
  width: 340px;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-flow: column;
  background: ${COLORS.THEME_FRONT};
  color: ${COLORS.FONT};
  outline: none;
  border: 1px solid ${COLORS.BORDER};
  z-index: 11;
`
