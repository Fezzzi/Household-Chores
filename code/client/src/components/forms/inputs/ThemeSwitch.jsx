import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Zoom from '@material-ui/core/Zoom';
import { Brightness6 } from '@material-ui/icons';

import * as ThemeActions from 'clientSrc/actions/themeActions';
import * as THEMES from 'clientSrc/constants/themeTypes';
import { IconButtonWrapper, IconButton } from 'clientSrc/styles/blocks/settings';

const reverseColorStyle = {
  position: 'absolute',
  stroke: 'var(--cThemeFront)',
};

const ThemeSwitchComponent = ({ theme, switchTheme }) => (
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
);

ThemeSwitchComponent.propTypes = {
  theme: PropTypes.string,
  switchTheme: PropTypes.func,
};

const mapStateToProps = ({ theme: { theme } }) => ({
  theme,
});

const mapDispatchToProps = dispatch => ({
  switchTheme: theme => dispatch(ThemeActions.triggerThemeChange(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchComponent);
