import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as SettingTypes from 'shared/constants/settingTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';
import { ContentColumn, SettingsWrapper } from 'clientSrc/styles/blocks/settings';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { loadSettings } from 'clientSrc/effects/settingsEffects';
import { settingsRenderers } from 'clientSrc/constants/settingsRenderers';
import { CATEGORY_ICONS, TAB_ICONS } from 'clientSrc/constants/settingIcons';

import Column from './Column';

const Settings = ({ categoryId, tabId, addNotification, history }) => {
  const [state, setState] = useState({
    categories: Object.values(SettingTypes.CATEGORIES),
    category: categoryId,
    tabs: SettingTypes.TAB_ROWS[categoryId],
    tab: tabId || SettingTypes.TAB_ROWS[categoryId][0],
    renderedTabs: SettingTypes.TAB_ROWS[categoryId],
    messages: {},
    categoryTypes: {},
    tabTypes: {},
  });
  const [data, setData] = useState({});
  const ref = useRef(categoryId);

  const changeCategory = category => setState(prevState => ({
    ...prevState,
    category,
    tab: SettingTypes.TAB_ROWS[category] && SettingTypes.TAB_ROWS[category][0],
  }));

  const changeTab = tab => setState(prevState => ({
    ...prevState,
    tab,
  }));

  const { category, tab } = state;

  useEffect(() => {
    loadSettings(category, tab)
      .then(({ data: { categories, tabs, messages, categoryTypes, tabTypes, data: newData } }) => {
        setState(prevState => ({
          ...prevState,
          categories,
          tabs,
          renderedTabs: tabs,
          messages,
          categoryTypes,
          tabTypes,
        }));
        setData(newData);
      })
      .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

    if (category !== ref.current) {
      ref.current = category;
      history.push({
        pathname: category,
        search: `?tab=${tab}`,
      });
    } else {
      history.push({
        search: `?tab=${tab}`,
      });
    }
  }, [category, tab]);

  const { categories, tabs, renderedTabs, messages, categoryTypes, tabTypes } = state;
  return (
    <SettingsWrapper>
      <Column
        type={SettingTypes.COLUMNS.CATEGORY}
        rows={categories}
        primary
        width="175px"
        icons={CATEGORY_ICONS}
        selected={category}
        messages={messages}
        types={categoryTypes}
        changeSelection={changeCategory}
        peekSelection={(peekCategory, enter) => setState({
          ...state,
          renderedTabs: (enter && SettingTypes.TAB_ROWS[peekCategory]) || tabs,
        })}
      />
      <Column
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
        {settingsRenderers[category] && settingsRenderers[category][tab] && settingsRenderers[category][tab](
          data,
          setData,
        )}
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
