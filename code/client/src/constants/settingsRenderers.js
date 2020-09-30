import React from 'react';

import ConnectionListForm from 'clientSrc/components/connections/ConnectionListForm';
import HouseholdInvitationList from 'clientSrc/components/household/HouseholdInvitationList';
import { SettingsForm } from 'clientSrc/components/settings/SettingsForm';
import { CATEGORIES, TABS } from 'shared/constants/settingTypes';
import { FORM } from 'shared/constants/localeMessages';
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType';

import { settingsConfiguration } from './settingsConfiguration';
import HouseholdModificaionForm from 'clientSrc/components/household/HouseholdModificationForm';

const renderFormFromConfig = (category, tab, settings) => data =>
  <SettingsForm category={category} tab={tab} settings={settings} data={data} />;

const renderConnectionListForm = (dataKey, emptyMessage, tab, size) => (data, setData) =>
  <ConnectionListForm data={data} setData={setData} dataKey={dataKey} emptyMessage={emptyMessage} tab={tab} size={size} />;

export const settingsRenderers = {
  ...Object.fromEntries(
    Object.keys(settingsConfiguration).map(category =>
      [category, Object.fromEntries(
        Object.keys(settingsConfiguration[category]).map(tab =>
          [tab, renderFormFromConfig(category, tab, settingsConfiguration[category][tab])]
        )
      )]
    )
  ),
  [CATEGORIES.CONNECTIONS]: {
    tabModifiers: data => tab => {
      switch (tab) {
        case TABS.MY_CONNECTIONS: return ` (${data[CONNECTION_STATE_TYPE.APPROVED]?.length || 0})`;
        case TABS.PENDING: return ` (${data[CONNECTION_STATE_TYPE.WAITING]?.length || 0})`;
        case TABS.BLOCKED: return ` (${data[CONNECTION_STATE_TYPE.BLOCKED]?.length || 0})`;
        default: return '';
      }
    },
    [TABS.MY_CONNECTIONS]:
      renderConnectionListForm(CONNECTION_STATE_TYPE.APPROVED, FORM.NO_CONNECTIONS, TABS.MY_CONNECTIONS, 320),
    [TABS.FIND_CONNECTION]:
      renderConnectionListForm(CONNECTION_STATE_TYPE.FOUND, '', TABS.FIND_CONNECTION),
    [TABS.PENDING]:
      renderConnectionListForm(CONNECTION_STATE_TYPE.WAITING, FORM.NO_CONNECTION_REQUESTS, TABS.PENDING),
    [TABS.BLOCKED]:
      renderConnectionListForm(CONNECTION_STATE_TYPE.BLOCKED, FORM.NO_BLOCKED_CONNECTIONS, TABS.BLOCKED, 220),
  },
  [CATEGORIES.HOUSEHOLDS]: {
    tabModifiers: data => tab => tab === TABS.INVITATIONS && ` (${data.invitations?.length || 0})`,
    [TABS.NEW_HOUSEHOLD]: '',
    [TABS.INVITATIONS]: (data, setData) =>
      <HouseholdInvitationList invitations={data.invitations || []} setData={setData} />,
    [TABS._HOUSEHOLD]: (data, setData, tab) =>
      <HouseholdModificaionForm household={data.households?.find(({ key }) => key === tab) || {}} tab={tab} setData={setData} />
  },
};
