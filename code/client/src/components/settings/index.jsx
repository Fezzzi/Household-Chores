import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as SettingTypes from 'shared/constants/settingTypes';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR } from 'shared/constants/localeMessages';
import { SettingsWrapper } from 'clientSrc/styles/blocks/settings';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import { loadSettings } from 'clientSrc/effects/settingsEffects';

import Column from './Column';
import Content from './Content';

const Settings = ({ categoryId, addNotification }) => {
  const [state, setState] = useState({
    categories: Object.values(SettingTypes.CATEGORIES),
    category: categoryId,
    tabs: SettingTypes.TAB_ROWS[categoryId],
    tab: SettingTypes.TAB_ROWS[categoryId][0],
  });

  const { category, tab, categories, tabs } = state;

  useEffect(() => {
    loadSettings(category, tab)
      .then(data => console.log(data))
      .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR))
  }, [category, tab]);

  return (
    <SettingsWrapper>
      <Column
        type={SettingTypes.COLUMNS.CATEGORY}
        rows={categories}
        primary={true}
        width="150px"
        selected={category}
        changeSelection={category => setState({
          ...state,
          category,
          tab: SettingTypes.TAB_ROWS[category][0],
        })}
        peekSelection={peekCategory => setState({
          ...state,
          tabs: SettingTypes.TAB_ROWS[peekCategory],
        })}
      />
      <Column
        type={SettingTypes.COLUMNS.TAB}
        rows={tabs}
        primary={false}
        width="250px"
        selected={tab}
        changeSelection={tab => setState({
          ...state,
          tab,
        })}
      />
      <Content configuration={{}} />
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(Settings);
