import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Zoom from '@material-ui/core/Zoom'
import { Brightness6 } from '@material-ui/icons'

import * as ThemeActions from 'clientSrc/actions/themeActions'
import * as THEMES from 'clientSrc/constants/themeTypes'
import { IconButtonWrapper, IconButton } from 'clientSrc/styles/blocks/settings'

const reverseColorStyle = {
  position: 'absolute',
  stroke: 'var(--cThemeFront)',
}

const ThemeSwitch = () => {
  const theme = useSelector(({ theme: { theme } }) => theme)
  const dispatch = useDispatch()
  const switchTheme = useCallback(theme => dispatch(ThemeActions.triggerThemeChange(theme)), [dispatch])

  return (
    <IconButtonWrapper>
      <IconButton onClick={() => switchTheme(theme)}>
        <Zoom in={theme === THEMES.DARK_THEME} timeout={300} style={reverseColorStyle}>
          <Brightness6 />
        </Zoom>
        <Zoom in={theme !== THEMES.DARK_THEME} timeout={300}>
          <Brightness6 />
        </Zoom>
      </IconButton>
    </IconButtonWrapper>
  )
}

export default ThemeSwitch
