import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import deepEqual from 'fast-deep-equal';

import { ContentColumn, SettingsWrapper } from 'clientSrc/styles/blocks/settings';
import { settingsRenderers } from 'clientSrc/constants/settingsRenderers';
import { CATEGORY_ICONS, TAB_ICONS } from 'clientSrc/constants/settingIcons';
import { getSubmitHandler } from 'clientSrc/helpers/form';
import { useContentRendererKeys } from 'clientSrc/helpers/settings';
import * as SettingsActions from 'clientSrc/actions/settingsActions';
import * as SettingTypes from 'shared/constants/settingTypes';

import SettingsColumn from './SettingsColumn';

const Settings = memo(({ history, location }) => {
  const [state, setState] = useState({ category: null, tab: null });

  const settings = useSelector(({ settings: settingsState }) => settingsState, deepEqual);

  const dispatch = useDispatch();
  const loadSettings = useCallback((category, tab) =>
      dispatch(SettingsActions.loadSettings({ category, tab })),
    [dispatch]);

  useEffect(() => {
    let category = location.pathname.split('/')?.[2];
    let tab = location.search.match(/tab=([^&]+)/)?.[1];

    setState({
      category,
      tab,
    });
    loadSettings(category, tab);
    // todo: Resolve redirecting to default category or default tab of selected category in case of route not matching
  }, [location]);

  const { data, categories, messages, categoryTypes, tabTypes } = settings;
  const { category, tab } = state;
  const [peekedTabs, setPeekedTabs] = useState(SettingTypes.TAB_ROWS[category]);

  const tabs = useMemo(() => {
    if (settings.tabs.length > 0) {
      setPeekedTabs(settings.tabs);
      return settings.tabs;
    }
    return SettingTypes.TAB_ROWS[category];
  }, [settings.tabs]);

  const { categoryKey, tabKey } = useMemo(() =>
    useContentRendererKeys(category, tab, categoryTypes, tabTypes),
  [category, tab, categoryTypes, tabTypes]
  );

  const changeCategory = useCallback(newCategory => {
    const newTab = SettingTypes.TAB_ROWS[newCategory]
      ? SettingTypes.TAB_ROWS[newCategory][0]
      : SettingTypes.TAB_ROWS[categoryTypes[newCategory]][0];

    setState({
      category: newCategory,
      tab: newTab,
    });

    history.push({
      pathname: newCategory,
      search: `?tab=${newTab}`,
    });
    loadSettings(newCategory, newTab);
  }, [categoryTypes, setState]);

  const changeTab = useCallback(newTab => {
    setState(prevState => ({
      ...prevState,
      tab: newTab,
    }));

    history.push({
      search: `?tab=${newTab}`,
    });
    loadSettings(category, newTab);
  }, [category, setState]);

  const submitHandler = getSubmitHandler(category, tab);

  return (
    <SettingsWrapper>
      <SettingsColumn
        type={SettingTypes.COLUMNS.CATEGORY}
        rows={categories}
        primary
        width="175px"
        icons={CATEGORY_ICONS}
        selected={category}
        messages={messages}
        types={categoryTypes}
        changeSelection={changeCategory}
        peekSelection={useCallback((peekCategory, enter) => setPeekedTabs(
          enter ? SettingTypes.TAB_ROWS[peekCategory] : null
        ), [tabs, setPeekedTabs])}
      />
      <SettingsColumn
        type={SettingTypes.COLUMNS.TAB}
        rows={peekedTabs || tabs}
        primary={false}
        width="225px"
        selected={tab}
        icons={TAB_ICONS}
        messages={messages}
        types={tabTypes}
        changeSelection={changeTab}
        modifiers={settingsRenderers[category]?.tabModifiers && settingsRenderers[category].tabModifiers(data)}
      />
      <ContentColumn>
        {categoryKey && tabKey && settingsRenderers[categoryKey][tabKey](data, submitHandler, tab, category)}
      </ContentColumn>
    </SettingsWrapper>
  );
});

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Settings;
