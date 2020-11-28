import React from 'react'

import {
  ConnectionListForm, ConnectionSearchForm, HouseholdCreateForm, HouseholdModificationForm,
  HouseholdInvitationList, ProfileForm, NotificationForm,
} from 'clientSrc/components/forms'
import { CATEGORIES, TABS } from 'shared/constants/settingTypes'
import { FORM, SETTINGS } from 'shared/constants/localeMessages'
import * as CONNECTION_STATE_TYPE from 'shared/constants/connectionStateType'
import * as SettingTypes from 'shared/constants/settingTypes'

const renderConnectionListForm = (dataKey, emptyMessage, tab, headlineMessage) => data => (
  <ConnectionListForm
    data={data}
    dataKey={dataKey}
    emptyMessage={emptyMessage}
    headlineMessage={headlineMessage}
    tab={tab}
  />
)

export const settingsRenderers = {
  [CATEGORIES.PROFILE]: {
    [TABS.GENERAL]: (data, handleSubmit) => (
      <ProfileForm data={data} onSubmit={handleSubmit} />
    ),
    [TABS.NOTIFICATIONS]: (data, handleSubmit) => (
      <NotificationForm data={data} onSubmit={handleSubmit} />
    ),
  },
  [CATEGORIES.CONNECTIONS]: {
    tabModifiers: data => tab => {
      switch (tab) {
        case TABS.MY_CONNECTIONS: return ` (${data[CONNECTION_STATE_TYPE.APPROVED]?.length || 0})`
        case TABS.PENDING: return ` (${data[CONNECTION_STATE_TYPE.WAITING]?.length || 0})`
        case TABS.BLOCKED: return ` (${data[CONNECTION_STATE_TYPE.BLOCKED]?.length || 0})`
        default: return ''
      }
    },
    [TABS.MY_CONNECTIONS]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.APPROVED,
      FORM.NO_CONNECTIONS,
      TABS.MY_CONNECTIONS,
      SETTINGS[`${SettingTypes.COLUMNS.TAB}_${TABS.MY_CONNECTIONS}`],
    ),
    [TABS.FIND_CONNECTION]: data => (
      <ConnectionSearchForm
        data={data}
        dataKey={CONNECTION_STATE_TYPE.FOUND}
        headlineMessage={SETTINGS[`${SettingTypes.COLUMNS.TAB}_${TABS.FIND_CONNECTION}`]}
        tab={TABS.FIND_CONNECTION}
      />
    ),
    [TABS.PENDING]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.WAITING,
      FORM.NO_CONNECTION_REQUESTS,
      TABS.PENDING,
      FORM.PENDING_CONNECTIONS,
    ),
    [TABS.BLOCKED]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.BLOCKED,
      FORM.NO_BLOCKED_CONNECTIONS,
      TABS.BLOCKED,
      FORM.BLOCKED_CONNECTIONS,
    ),
  },
  [CATEGORIES.HOUSEHOLDS]: {
    tabModifiers: data => tab => tab === TABS.INVITATIONS && ` (${data.invitations?.length || 0})`,
    [TABS.NEW_HOUSEHOLD]: data => <HouseholdCreateForm connections={data.connections} />,
    [TABS.INVITATIONS]: data => <HouseholdInvitationList invitations={data.invitations || []} />,
    [TABS._HOUSEHOLD]: (data, handleSubmit, tab) => (
      <HouseholdModificationForm
        household={data.households?.find(({ key }) => key === tab)}
        connections={data.connections}
      />
    ),
  },
}
