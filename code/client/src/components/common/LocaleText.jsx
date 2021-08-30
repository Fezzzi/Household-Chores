import React from 'react'
import { PropTypes } from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { interpolate } from 'shared/helpers/text'
import { linkify } from 'clientSrc/helpers/linkifyText'

const LocaleText = ({ message, messageTexts, modifierFunc, transformations, highlightInterpolated, clickHandler }) => {
  const history = useHistory()
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)

  const htmlText = modifierFunc(transformations
    ? linkify(interpolate(applicationTexts, message, messageTexts, highlightInterpolated), history)
    : applicationTexts[message])

  if (htmlText === undefined) {
    return (
      <span onClick={clickHandler}>
        {message}
      </span>
    )
  }

  return <span onClick={clickHandler} dangerouslySetInnerHTML={{ __html: htmlText }} />
}

LocaleText.defaultProps = {
  messageTexts: [],
  modifierFunc: message => message,
  clickHandler: () => {},
  transformations: true,
  highlightInterpolated: false,
}

LocaleText.propTypes = {
  message: PropTypes.string.isRequired,
  messageTexts: PropTypes.arrayOf(PropTypes.string),
  modifierFunc: PropTypes.func,
  transformations: PropTypes.bool,
  highlightInterpolated: PropTypes.bool,
  clickHandler: PropTypes.func,
}

export default LocaleText
