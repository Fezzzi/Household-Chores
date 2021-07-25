import { useState, useMemo, useEffect } from 'react'

import { DEVICES, MOBILE_WIDTH, TABLET_WIDTH } from 'clientSrc/constants'

export const useScrollOffset = (scrollRootId = 'scrollRoot') => {
  const element = useMemo(() => document.getElementById(scrollRootId), [])
  const [paddingTop, paddingLeft] = useMemo(() => {
    if (!element) {
      return [0, 0]
    }
    const style = getComputedStyle(element)
    return [Number.parseFloat(style['padding-top']), Number.parseFloat(style['padding-left'])]
  }, [element])

  const [scrolls, setScrolls] = useState(() => {
    if (!element) {
      return {
        scrollTop: 0,
        scrollLeft: 0,
      }
    }

    const { scrollTop, scrollLeft } = element
    return {
      scrollTop: scrollTop - element.offsetTop - paddingTop,
      scrollLeft: scrollLeft - element.offsetLeft - paddingLeft,
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollLeft } = element
      setScrolls({
        scrollTop: scrollTop - element.offsetTop - paddingTop,
        scrollLeft: scrollLeft - element.offsetLeft - paddingLeft,
      })
    }

    if (!element) {
      return () => {}
    }

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [element, paddingTop, paddingLeft])

  return scrolls
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export const useDevice = () => {
  const { width } = useWindowDimensions()
  return useMemo(() => width > TABLET_WIDTH
    ? DEVICES.DESKTOP
    : width > MOBILE_WIDTH
      ? DEVICES.TABLET
      : DEVICES.MOBILE, [width])
}
