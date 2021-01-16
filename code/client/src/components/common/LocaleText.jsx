import React from 'react'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'

const LocaleText = ({ message, modifierFunc, clickHandler }) => {
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)

  return (
    <span onClick={clickHandler}>
      {modifierFunc(applicationTexts[message]) ?? message}
    </span>
  )
}

LocaleText.defaultProps = {
  modifierFunc: message => message,
  clickHandler: () => {},
}

LocaleText.propTypes = {
  message: PropTypes.string.isRequired,
  modifierFunc: PropTypes.func,
  clickHandler: PropTypes.func,
}

export default LocaleText
