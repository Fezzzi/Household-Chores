import React from 'react';
import { connect } from 'react-redux';

import { PageWrapper } from 'clientSrc/styles/blocks';

const PageWrapperComponent = ({ theme, changing, children }) => (
  <PageWrapper className={`${theme} ${changing ? 'theme-transition' : ''}`}>
    {children}
  </PageWrapper>
);

const mapStateToProps = ({ theme: { theme, changing } }) => ({
  theme,
  changing,
});

export default connect(mapStateToProps)(PageWrapperComponent);
