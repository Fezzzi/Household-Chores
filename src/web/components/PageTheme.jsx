import React from 'react'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'

import { ThemeWrapper } from '../styles/blocks'

const PageTheme = ({ children }) => {
  const { theme, changing } = useSelector(({ theme }) => theme)

  return (
    <ThemeWrapper className={`${theme} ${changing ? 'theme-transition' : ''}`}>
      {children}
    </ThemeWrapper>
  )
}

PageTheme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
}

export default PageTheme
