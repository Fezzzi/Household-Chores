import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { PageWrapper } from 'clientSrc/styles/blocks';

const PageWrapperComponent = ({ theme, changing, children }) => (
  <PageWrapper className={`${theme} ${changing ? 'theme-transition' : ''}`}>
    {children}
  </PageWrapper>
);

PageWrapperComponent.propTypes = ({
  theme: PropTypes.string,
  changing: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
});

const mapStateToProps = ({ theme: { theme, changing } }) => ({
  theme,
  changing,
});

export default connect(mapStateToProps)(PageWrapperComponent);
