import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { ThemeWrapper } from 'clientSrc/styles/blocks'

const PageTheme = ({ theme, changing, children }) => (
  <ThemeWrapper className={`${theme} ${changing ? 'theme-transition' : ''}`}>
    {children}
  </ThemeWrapper>
)

PageTheme.propTypes = {
  theme: PropTypes.string.isRequired,
  changing: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
}

const mapStateToProps = ({ theme: { theme, changing } }) => ({
  theme,
  changing,
})

export default connect(mapStateToProps)(PageTheme)
