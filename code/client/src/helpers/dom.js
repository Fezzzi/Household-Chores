import { useState, useMemo, useEffect } from 'react'

import { DEVICES, MOBILE_WIDTH, TABLET_WIDTH } from 'clientSrc/constants'

export const useScrollOffset = (scrollRoot = 'pageWrapper') => {
  const element = useMemo(() => document.getElementById(scrollRoot), [])
  const style = useMemo(() => getComputedStyle(element), [element])
  const [scrolls, setScrolls] = useState(() => {
    const { scrollTop, scrollLeft } = element
    return {
      scrollTop: scrollTop - element.offsetTop - Number.parseFloat(style['padding-top']),
      scrollLeft: scrollLeft - element.offsetLeft - Number.parseFloat(style['padding-left']),
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollLeft } = element
      setScrolls({
        scrollTop: scrollTop - element.offsetTop - Number.parseFloat(style['padding-top']),
        scrollLeft: scrollLeft - element.offsetLeft - Number.parseFloat(style['padding-left']),
      })
    }

    element.addEventListener('scroll', handleScroll)
    return () => element.removeEventListener('scroll', handleScroll)
  }, [])

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
