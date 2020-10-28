import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as SettingTypes from 'shared/constants/settingTypes';
import { ContentColumn, SettingsWrapper } from 'clientSrc/styles/blocks/settings';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { settingsRenderers } from 'clientSrc/constants/settingsRenderers';
import { CATEGORY_ICONS, TAB_ICONS } from 'clientSrc/constants/settingIcons';
import { useContentRendererKeys, useSettingsLoader } from 'clientSrc/helpers/settings';

import SettingsColumn from './SettingsColumn';

const Settings = ({ categoryId, tabId, addNotification, history }) => {
  const [state, setState] = useState({
    categories: Object.values(SettingTypes.CATEGORIES),
    category: categoryId,
    tabs: SettingTypes.TAB_ROWS[categoryId],
    tab: tabId || SettingTypes.TAB_ROWS[categoryId][0],
    messages: {},
    categoryTypes: {},
    tabTypes: {},
  });
  const { category, tab, categories, tabs, messages, categoryTypes, tabTypes } = state;

  const [renderedTabs, setRenderedTabs] = useState(SettingTypes.TAB_ROWS[categoryId]);
  const [data, setData] = useState({});
  const settingsLoader = useSettingsLoader();

  useEffect(() => {
    settingsLoader(category, tab, setState, setData, setRenderedTabs, addNotification);
  }, []);

  const { categoryKey, tabKey } = useMemo(() =>
    useContentRendererKeys(category, tab, categoryTypes, tabTypes),
  [category, tab, categoryTypes, tabTypes]
  );

  const changeCategory = useCallback(newCategory => {
    const newTab = SettingTypes.TAB_ROWS[newCategory]
      ? SettingTypes.TAB_ROWS[newCategory][0]
      : SettingTypes.TAB_ROWS[categoryTypes[newCategory]][0];

    setState(prevState => ({
      ...prevState,
      category: newCategory,
      tab: newTab,
    }));

    history.push({
      pathname: newCategory,
      search: `?tab=${newTab}`,
    });
    settingsLoader(newCategory, newTab, setState, setData, addNotification);
  }, [categoryTypes, setState, setData, addNotification]);

  const changeTab = useCallback(newTab => {
    setState(prevState => ({
      ...prevState,
      tab: newTab,
    }));

    history.push({
      search: `?tab=${newTab}`,
    });
    settingsLoader(category, newTab, setState, setData, addNotification);
  }, [category, setState, setData, addNotification]);

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
        peekSelection={useCallback((peekCategory, enter) => setRenderedTabs(
          (enter && SettingTypes.TAB_ROWS[peekCategory]) || tabs
        ), [tabs, setRenderedTabs])}
      />
      <SettingsColumn
        type={SettingTypes.COLUMNS.TAB}
        rows={renderedTabs}
        primary={false}
        width="225px"
        selected={tab}
        icons={TAB_ICONS}
        messages={messages}
        types={tabTypes}
        changeSelection={changeTab}
        modifiers={settingsRenderers[category].tabModifiers && settingsRenderers[category].tabModifiers(data)}
      />
      <ContentColumn>
        {categoryKey && tabKey && settingsRenderers[categoryKey][tabKey](data, setData, tab, category)}
      </ContentColumn>
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  categoryId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  history: PropTypes.object.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(Settings);
