import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

const LocaleTextComponent = ({ message, modifierFunc, clickHandler, applicationTexts }) => (
  <span onClick={clickHandler}>
    {modifierFunc(applicationTexts[message]) || message}
  </span>
)

LocaleTextComponent.defaultProps = {
  modifierFunc: message => message,
  clickHandler: () => {},
}

LocaleTextComponent.propTypes = {
  message: PropTypes.string.isRequired,
  modifierFunc: PropTypes.func,
  clickHandler: PropTypes.func,
  applicationTexts: PropTypes.object.isRequired,
}

const mapStateToProps = ({ locale: { applicationTexts } }) => ({
  applicationTexts,
})

export default connect(mapStateToProps)(LocaleTextComponent)
