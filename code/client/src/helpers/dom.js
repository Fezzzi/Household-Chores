import { useState, useMemo, useEffect } from 'react'

import { DEVICES, MOBILE_WIDTH, TABLET_WIDTH } from 'clientSrc/constants'

export const useScrollOffset = () => {
  const element = useMemo(() => document.getElementById('pageWrapper'), [])
  const [scrolls, setScrolls] = useState(() => {
    const { scrollTop, scrollLeft } = element
    return {
      scrollTop,
      scrollLeft,
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollLeft } = document.getElementById('pageWrapper')
      setScrolls({
        scrollTop,
        scrollLeft,
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
