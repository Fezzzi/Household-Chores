import React from 'react';
import PropTypes from 'prop-types';

import { ContentColumn } from 'clientSrc/styles/blocks/settings';

const Content = (configuration) => (
  <ContentColumn>
    Settings content for configuration {JSON.stringify(configuration)}
  </ContentColumn>
);

Content.propTypes = ({
  configuration: PropTypes.object.isRequired,
});

export default Content;
