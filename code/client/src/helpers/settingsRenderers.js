import React from 'react'

import {
  ConnectionListForm, ConnectionSearchForm, HouseholdCreateForm, HouseholdModificationForm,
  HouseholdInvitationListForm, ProfileForm, NotificationForm,
} from 'clientSrc/components/forms'
import { SETTING_COLUMNS, SETTING_CATEGORIES, SETTING_TABS, CONNECTION_STATE_TYPE } from 'shared/constants'
import { FORM, SETTINGS } from 'shared/constants/localeMessages'

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
  [SETTING_CATEGORIES.PROFILE]: {
    [SETTING_TABS.GENERAL]: (data, handleSubmit) => (
      <ProfileForm data={data} onSubmit={handleSubmit} />
    ),
    [SETTING_TABS.NOTIFICATIONS]: (data, handleSubmit) => (
      <NotificationForm data={data} onSubmit={handleSubmit} />
    ),
  },
  [SETTING_CATEGORIES.CONNECTIONS]: {
    tabModifiers: data => tab => {
      switch (tab) {
        case SETTING_TABS.MY_CONNECTIONS: return ` (${data[CONNECTION_STATE_TYPE.APPROVED]?.length || 0})`
        case SETTING_TABS.PENDING: return ` (${data[CONNECTION_STATE_TYPE.WAITING]?.length || 0})`
        case SETTING_TABS.BLOCKED: return ` (${data[CONNECTION_STATE_TYPE.BLOCKED]?.length || 0})`
        default: return ''
      }
    },
    [SETTING_TABS.MY_CONNECTIONS]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.APPROVED,
      FORM.NO_CONNECTIONS,
      SETTING_TABS.MY_CONNECTIONS,
      SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.MY_CONNECTIONS}`],
    ),
    [SETTING_TABS.FIND_CONNECTION]: data => (
      <ConnectionSearchForm
        data={data}
        dataKey={CONNECTION_STATE_TYPE.FOUND}
        headlineMessage={SETTINGS[`${SETTING_COLUMNS.TAB}_${SETTING_TABS.FIND_CONNECTION}`]}
        tab={SETTING_TABS.FIND_CONNECTION}
      />
    ),
    [SETTING_TABS.PENDING]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.WAITING,
      FORM.NO_CONNECTION_REQUESTS,
      SETTING_TABS.PENDING,
      FORM.PENDING_CONNECTIONS,
    ),
    [SETTING_TABS.BLOCKED]: renderConnectionListForm(
      CONNECTION_STATE_TYPE.BLOCKED,
      FORM.NO_BLOCKED_CONNECTIONS,
      SETTING_TABS.BLOCKED,
      FORM.BLOCKED_CONNECTIONS,
    ),
  },
  [SETTING_CATEGORIES.HOUSEHOLDS]: {
    tabModifiers: data => tab => tab === SETTING_TABS.INVITATIONS && ` (${data.invitations?.length || 0})`,
    [SETTING_TABS.NEW_HOUSEHOLD]: data =>
      <HouseholdCreateForm connections={data.connections} />,
    [SETTING_TABS.INVITATIONS]: data =>
      <HouseholdInvitationListForm invitations={data.invitations || []} />,
    [SETTING_TABS._HOUSEHOLD]: (data, handleSubmit, tab) => (
      <HouseholdModificationForm
        household={data.households?.find(({ key }) => key === tab)}
        connections={data.connections}
      />
    ),
  },
}
