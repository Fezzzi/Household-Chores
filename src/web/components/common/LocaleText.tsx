import React, { MouseEvent } from 'react'

import { interpolate } from 'shared/helpers/text'
import { transformToReact } from 'web/helpers/textTransformations'
import { useSelector } from 'web/helpers/useTypedRedux'

interface LocaleTextProps {
  message: string
  messageTexts?: string[]
  modifierFunc?: (localizedText: string | null) => string | null
  transformations?: boolean
  highlightInterpolated?: boolean
  clickHandler?: (e: MouseEvent<HTMLSpanElement>) => void
}

export const LocaleText = ({
  message,
  messageTexts = [],
  modifierFunc = message => message,
  transformations = true,
  highlightInterpolated = false,
  clickHandler = () => {},
}: LocaleTextProps) => {
  const applicationTexts = useSelector(({ locale: { applicationTexts } }) => applicationTexts)
  let text

  if (transformations) {
    const interpolatedText = interpolate(applicationTexts, message, messageTexts, highlightInterpolated)
    text = transformToReact(modifierFunc(interpolatedText))
  } else {
    text = modifierFunc(applicationTexts[message] ?? null)
  }

  return (
    <span onClick={clickHandler}>
      {text ?? message}
    </span>
  )
}
