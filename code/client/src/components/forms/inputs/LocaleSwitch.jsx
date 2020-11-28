import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LABELS } from 'shared/constants/locale'
import { FLAGS } from 'clientSrc/constants/localeFlags'
import * as LocaleActions from 'clientSrc/actions/localeActions'
import {
  IconButtonWrapper, IconButton, LocaleIcon,
  LocaleLabel, LocaleSelector, LocaleLine,
} from 'clientSrc/styles/blocks/settings'

const LocaleSwitch = () => {
  const [state, setState] = useState({ expanded: false, inputActive: false })

  const { locale, availableLocales } = useSelector(({ locale }) => locale)
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
          {LABELS[locale]}
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
          {renderLocaleSelection(availableLocales.filter(l => l !== locale), switchLocale)}
        </LocaleSelector>
        {FLAGS[locale]()}
      </IconButton>
    </IconButtonWrapper>
  )
}

export default LocaleSwitch
