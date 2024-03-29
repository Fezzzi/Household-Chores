import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AVAILABLE_LOCALES, LOCALE_LABELS } from 'shared/constants'
import { FLAGS } from 'web/constants'
import { LocaleActions } from 'web/actions'
import {
  IconButtonWrapper, IconButton, LocaleIcon,
  LocaleLabel, LocaleSelector, LocaleLine,
} from 'web/styles/blocks/settings'
import { useCurrentLocale } from 'web/helpers/useCurrentLocale'

const LocaleSwitch = () => {
  const [state, setState] = useState({ expanded: false, inputActive: false })

  const currentLocale = useCurrentLocale()
  const dispatch = useDispatch()
  const switchLocale = useCallback(locale =>
    dispatch(LocaleActions.triggerLocaleChange(locale)),
  [dispatch])

  const renderLocaleSelection = (locales, switchFunc) =>
    locales.map((locale, key) => (
      <LocaleLine key={`locale-${key}`} onClick={() => switchFunc(locale)}>
        <LocaleIcon>
          {FLAGS[locale]()}
        </LocaleIcon>
        <LocaleLabel>
          {LOCALE_LABELS[locale]}
        </LocaleLabel>
      </LocaleLine>
    ))

  const { expanded, inputActive } = state
  return (
    <IconButtonWrapper>
      <IconButton
        active={inputActive}
        onClick={() => setState({
          expanded: !expanded,
          inputActive: true,
        })}
        onBlur={() => setState({
          expanded: false,
          inputActive: false,
        })}
      >
        <LocaleSelector hidden={!expanded}>
          {renderLocaleSelection(AVAILABLE_LOCALES.filter(locale => locale !== currentLocale), switchLocale)}
        </LocaleSelector>
        {FLAGS[currentLocale]()}
      </IconButton>
    </IconButtonWrapper>
  )
}

export default LocaleSwitch
