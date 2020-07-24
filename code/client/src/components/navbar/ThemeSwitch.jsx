import React from 'react';
import { connect } from "react-redux";
import Zoom from '@material-ui/core/Zoom';
import { Brightness3, Brightness7 } from '@material-ui/icons';

import * as ThemeActions from 'clientSrc/actions/themeActions';
import * as THEMES from 'clientSrc/constants/themeTypes';
import { IconButton } from 'clientSrc/styles/blocks/navbar';

const ThemeSwitchComponent = ({ theme, switchTheme }) => (
  <IconButton onClick={() => switchTheme(theme)}>
    <Zoom in={theme === THEMES.DARK_THEME} style={{ position: 'absolute' }}>
      <Brightness3 />
    </Zoom>
    <Zoom in={theme !== THEMES.DARK_THEME} >
      <Brightness7 />
    </Zoom>
  </IconButton>
);

const mapStateToProps = ({ theme: { theme }}) => ({
  theme,
});

const mapDispatchToProps = dispatch => ({
  switchTheme: theme => dispatch(ThemeActions.triggerThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchComponent);
