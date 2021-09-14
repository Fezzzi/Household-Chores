import React, { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import deepEqual from 'fast-deep-equal'

import { ContentColumn, SettingsWrapper } from 'clientSrc/styles/blocks/settings'
import { settingsRenderers } from 'clientSrc/helpers/settingsRenderers'
import { CATEGORY_ICONS, PORTAL_TYPE, TAB_ICONS } from 'clientSrc/constants'
import { useSubmitHandler } from 'clientSrc/helpers/form'
import { SettingsActions } from 'clientSrc/actions'
import { SETTING_TAB_ROWS, SETTING_CATEGORIES, SETTING_COLUMNS } from 'shared/constants'
import { PortalAnchor } from 'clientSrc/styles/blocks'

import SettingsColumn from './SettingsColumn'

const Settings = memo(({ history, location }) => {
  const [state, setState] = useState({
    category: location.pathname.split('/')?.[2],
    tab: location.search.match(/tab=([^&]+)/)?.[1],
  })

  const settings = useSelector(({ settings: settingsState }) => settingsState, deepEqual)

  const dispatch = useDispatch()
  const loadSettings = useCallback((category, tab) =>
    dispatch(SettingsActions.loadSettings({ category, tab })),
  [dispatch])

  const { category, tab } = state
  useEffect(() => {
    const newCategory = location.pathname.split('/')?.[2]
    const newTab = location.search.match(/tab=([^&]+)/)?.[1]

    if (Object.values(SETTING_CATEGORIES).indexOf(newCategory) === -1) {
      history.push({
        pathname: SETTING_CATEGORIES.PROFILE,
        search: `tab=${SETTING_TAB_ROWS[SETTING_CATEGORIES.PROFILE][0]}`,
      })
      return
    }

    loadSettings(newCategory, newTab)
    if (category !== newCategory || tab !== newTab) {
      setState({
        category: newCategory,
        tab: newTab,
      })
    }
  }, [location])

  const { data, categories, tabs, tabMessages, tabTypes } = settings
  const [peekedTabs, setPeekedTabs] = useState(SETTING_TAB_ROWS[category])

  const displayedTabs = useMemo(() => {
    if (tabs.length > 0) {
      setPeekedTabs(tabs)
      return tabs
    }
    return SETTING_TAB_ROWS[category]
  }, [tabs])

  const tabKey = useMemo(() =>
    settingsRenderers[category]?.[tab]
      ? tab
      : settingsRenderers[category]?.[tabTypes[tab]]
        ? tabTypes[tab]
        : null,
  [category, tab, tabTypes]
  )

  const changeCategory = useCallback(newCategory => history.push({
    pathname: newCategory,
    search: `?tab=${SETTING_TAB_ROWS[newCategory][0]}`,
  }), [setState])

  const changeTab = useCallback(newTab => history.push({
    search: `?tab=${newTab}`,
  }), [category, setState])

  const submitHandler = useSubmitHandler(SettingsActions.editSettings, { category, tab: tabKey })

  return (
    <SettingsWrapper>
      <SettingsColumn
        type={SETTING_COLUMNS.CATEGORY}
        rows={categories}
        primary
        width="175px"
        icons={CATEGORY_ICONS}
        selected={category}
        changeSelection={changeCategory}
        peekSelection={useCallback((peekCategory, enter) => setPeekedTabs(
          enter ? SETTING_TAB_ROWS[peekCategory] : null
        ), [displayedTabs, setPeekedTabs])}
      />
      <SettingsColumn
        type={SETTING_COLUMNS.TAB}
        rows={peekedTabs || displayedTabs}
        primary={false}
        width="225px"
        selected={tab}
        icons={TAB_ICONS}
        messages={tabMessages}
        types={tabTypes}
        changeSelection={changeTab}
        modifiers={settingsRenderers[category]?.tabModifiers && settingsRenderers[category].tabModifiers(data)}
      />
      <ContentColumn id="settingsWrapper">
        <PortalAnchor id={PORTAL_TYPE.SETTINGS_TOOLTIPS} />
        {category && tabKey && settingsRenderers[category][tabKey](data, submitHandler, tab, category)}
      </ContentColumn>
    </SettingsWrapper>
  )
})

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Settings
