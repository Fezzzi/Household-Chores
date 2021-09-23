import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Zoom from '@material-ui/core/Zoom'

import { COLORS, THEME_TYPE } from 'web/constants'
import { SunIcon } from 'web/styles/icons'
import { IconButtonWrapper, IconButton } from 'web/styles/blocks/settings'
import { ThemeActions } from 'web/actions'

const reverseColorStyle = {
  position: 'absolute',
  stroke: COLORS.THEME_FRONT,
}

const ThemeSwitch = () => {
  const theme = useSelector(({ theme: { theme } }) => theme)
  const dispatch = useDispatch()
  const switchTheme = useCallback(theme => dispatch(ThemeActions.triggerThemeChange(theme)), [dispatch])

  return (
    <IconButtonWrapper>
      <IconButton onClick={() => switchTheme(theme)}>
        <Zoom in={theme === THEME_TYPE.DARK_THEME} timeout={300} style={reverseColorStyle}>
          <SunIcon />
        </Zoom>
        <Zoom in={theme !== THEME_TYPE.DARK_THEME} timeout={300}>
          <SunIcon />
        </Zoom>
      </IconButton>
    </IconButtonWrapper>
  )
}

export default ThemeSwitch
