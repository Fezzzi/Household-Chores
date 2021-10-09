import React, { FocusEvent, useRef, useCallback, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { DEFAULT_FEED_PAGE_SIZE } from 'shared/constants'
import { HOME } from 'shared/constants/localeMessages'
import { COLORS, PORTAL_TYPE } from 'web/constants'
import { LoadActions } from 'web/actions'
import { SvgIcon } from 'web/styles/blocks/common'
import { BellIcon } from 'web/styles/icons'

import { ActivityFeed } from './ActivityFeed'
import { LocaleText } from '../../common'

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

  const loadingIconRef = useRef<HTMLDivElement>(null)
  const handleMoreFeedLoad = useCallback(async () => {
    if (feedPage !== -1 && !feedLoading) {
      const panelRect = panelRef.current?.getBoundingClientRect()
      const iconRect = loadingIconRef.current?.getBoundingClientRect()

      if (panelRect != null && iconRect != null) {
        const currentBottom = panelRect.top + panelRect.height
        const fetchMore = currentBottom > iconRect.top + (2 * iconRect.height / 3)

        if (fetchMore) {
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
      }
    }
  }, [panelRef.current, loadingIconRef.current, feedPage, feedLoading, setFeedLoading, setFeedPage, dispatch])

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current?.addEventListener('scroll', handleMoreFeedLoad)
    }

    return () => panelRef.current?.removeEventListener('scroll', handleMoreFeedLoad)
  }, [panelRef.current, handleMoreFeedLoad])

  if (floatingUIRoot == null) {
    return null
  }

  return ReactDOM.createPortal((
    <FloatingPanelWrapper tabIndex={-1} ref={el => {
      el?.focus()
      panelRef.current = el
    }} onBlur={handleBlur}>
      <ActivityFeed />
      {/* todo: Put loading throbber here */}
      {feedPage !== -1
        ? <LoadingIcon ref={loadingIconRef}><BellIcon /></LoadingIcon>
        : <LoadingText><LocaleText message={HOME.NO_MORE_FEED} /></LoadingText>
      }
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

const LoadingIcon = styled(SvgIcon)`
  height: 30px;
  width: 30px;
  margin: 10px auto;
`

const LoadingText = styled.div`
  text-align: center;
  padding: 10px 0;
  user-select: none;
  color: ${COLORS.LIGHT_SECONDARY};
`
