import React from 'react'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { linkify, interpolate } from 'clientSrc/helpers/textTransformations'

const LocaleText = ({ message, modifierFunc, transformations, clickHandler }) => {
  const history = useHistory()
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)

  const text = transformations
    ? linkify(interpolate(applicationTexts, message), history)
    : applicationTexts[message]

  return (
    <span onClick={clickHandler}>
      {modifierFunc(text) ?? message}
    </span>
  )
}

LocaleText.defaultProps = {
  modifierFunc: message => message,
  clickHandler: () => {},
  transformations: true,
}

LocaleText.propTypes = {
  message: PropTypes.string.isRequired,
  modifierFunc: PropTypes.func,
  transformations: PropTypes.bool,
  clickHandler: PropTypes.func,
}

export default LocaleText
