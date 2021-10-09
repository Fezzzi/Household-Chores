import React, { FocusEvent, useRef, useCallback, useState, SetStateAction, Dispatch } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { DEFAULT_FEED_PAGE_SIZE } from 'shared/constants'
import { COLORS, PORTAL_TYPE } from 'web/constants'
import { LoadActions } from 'web/actions'

import { ActivityFeed } from './ActivityFeed'

interface FloatingActivityFeedProps {
  feedPage: number
  setFeedPage: Dispatch<SetStateAction<number>>
  onBlur: (e: FocusEvent<HTMLElement>) => void
}

export const FloatingActivityFeed = ({ feedPage, setFeedPage, onBlur }: FloatingActivityFeedProps) => {
  const floatingUIRoot = document.getElementById(PORTAL_TYPE.FLOATING_UI)
  const panelRef = useRef<HTMLDivElement | null>()
  const handleBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    if (e.relatedTarget instanceof Node && panelRef.current?.contains(e.relatedTarget)) {
      return false
    }

    onBlur(e)
  }, [onBlur, panelRef.current])

  const [feedLoading, setFeedLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleMoreFeedLoad = useCallback(async () => {
    if (feedPage !== -1 && !feedLoading) {
      setFeedLoading(true)
      dispatch(LoadActions.feedLoad({
        page: feedPage + 1,
        pageSize: DEFAULT_FEED_PAGE_SIZE,
        callbackFunc: data => {
          setFeedLoading(false)
          if (data.length === DEFAULT_FEED_PAGE_SIZE) {
            setFeedPage(prevState => prevState + 1)
          } else {
            setFeedPage(-1)
          }
        },
      }))
    }
  }, [feedPage, feedLoading, setFeedLoading, setFeedPage, dispatch])

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
      {/* {feedLoading && 'loading...'} */}
      <span onClick={handleMoreFeedLoad}>loading...</span>
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
