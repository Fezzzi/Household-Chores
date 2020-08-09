import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const Profile = ({ locale }) => (
  <div>PROFILE SETTINGS in {locale} {console.log('MACARENA')}</div>
);

Profile.propTypes = ({
  locale: PropTypes.string.isRequired,
});

const mapStateToProps = ({ locale: { locale }}) => ({ locale });

export default connect(mapStateToProps)(Profile);
