import React, {useState, useEffect, useRef} from 'react';
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
    prevTabs: [],
    tab: tabId || SettingTypes.TAB_ROWS[categoryId][0],
    messages: {},
    data: {},
  });
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
      .then(({ data: { categories, tabs, messages, data } }) => setState(prevState => ({
        ...prevState,
        categories,
        tabs,
        messages,
        data,
      })))
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

  const { categories, tabs, prevTabs, messages, data } = state;
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
        changeSelection={changeCategory}
        peekSelection={(peekCategory, enter) => setState({
          ...state,
          prevTabs: (enter && tabs) || prevTabs,
          tabs: (enter && SettingTypes.TAB_ROWS[peekCategory]) || prevTabs,
        })}
      />
      <Column
        type={SettingTypes.COLUMNS.TAB}
        rows={tabs}
        primary={false}
        width="200px"
        selected={tab}
        icons={TAB_ICONS}
        messages={messages}
        changeSelection={changeTab}
      />
      <ContentColumn>
        {settingsRenderers[category] && settingsRenderers[category][tab] && settingsRenderers[category][tab](data)}
      </ContentColumn>
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  categoryId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  history: PropTypes.object.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(Settings);
