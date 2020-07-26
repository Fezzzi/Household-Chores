import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const LocaleTextComponent = ({ message, modifierFunc, applicationTexts }) => (
  <>
    {modifierFunc(applicationTexts[message] || '')}
  </>
);

LocaleTextComponent.defaultProps = ({
  modifierFunc: message => message,
});

LocaleTextComponent.propTypes = ({
  message: PropTypes.string.isRequired,
  modifierFunc: PropTypes.func,
  applicationTexts: PropTypes.objectOf(PropTypes.string).isRequired,
});

const mapStateToProps = ({ locale: { applicationTexts } }) => ({
  applicationTexts,
});

export default connect(mapStateToProps)(LocaleTextComponent);
