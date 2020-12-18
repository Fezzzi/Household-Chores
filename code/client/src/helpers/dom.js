import { useState, useMemo, useEffect } from 'react'

import { DEVICES, MOBILE_WIDTH, TABLET_WIDTH } from 'clientSrc/constants'

export const useScrollOffset = () =>
  // todo: Implement scroll offset
  ({
    x: 0,
    y: 0,
  })

export const useElementPosition = element => {
  const container = element.getBoundingClientRect()
  const scrollOffset = useScrollOffset()
  return {
    x: container.x + scrollOffset.x,
    y: container.y + scrollOffset.y,
  }
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
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

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
