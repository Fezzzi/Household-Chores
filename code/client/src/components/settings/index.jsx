import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { SETTINGS_PROFILE } from 'shared/constants/api';

import Profile from './Profile';

const Settings = ({ match: { url } }) => (
  <>
    <Route exact path={`/${url}/${SETTINGS_PROFILE}`} component={Profile} />
  </>
);

Settings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
};

export default Settings;
