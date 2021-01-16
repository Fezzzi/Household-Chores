import React from 'react'

import {
  ConnectionRequestsForm, ConnectionSearchForm, HouseholdCreateForm, HouseholdModificationForm,
  HouseholdInvitationListForm, ProfileForm, NotificationForm, ConnectionsListForm, ConnectionBlocksForm,
} from 'clientSrc/components/forms'
import { SETTING_COLUMNS, SETTING_CATEGORIES, SETTING_TABS, HOUSEHOLD_TABS, CONNECTION_STATE_TYPE } from 'shared/constants'
import { SETTINGS } from 'shared/constants/localeMessages'

export const settingsRenderers = {
  [SETTING_CATEGORIES.PROFILE]: {
    [SETTING_TABS.GENERAL]: (data, handleSubmit) => <ProfileForm data={data} onSubmit={handleSubmit} />,
    [SETTING_TABS.NOTIFICATIONS]: (data, handleSubmit) => <NotificationForm data={data} onSubmit={handleSubmit} />,
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
    [SETTING_TABS.MY_CONNECTIONS]: data => <ConnectionsListForm data={data[CONNECTION_STATE_TYPE.APPROVED]} />,
    [SETTING_TABS.FIND_CONNECTION]: data => <ConnectionSearchForm data={data[CONNECTION_STATE_TYPE.FOUND]} />,
    [SETTING_TABS.PENDING]: data => <ConnectionRequestsForm data={data[CONNECTION_STATE_TYPE.WAITING]} />,
    [SETTING_TABS.BLOCKED]: data => <ConnectionBlocksForm data={data[CONNECTION_STATE_TYPE.BLOCKED]} />,
  },
  [SETTING_CATEGORIES.HOUSEHOLDS]: {
    tabModifiers: data => tab => tab === HOUSEHOLD_TABS.INVITATIONS && ` (${data.invitations?.length || 0})`,
    [HOUSEHOLD_TABS.NEW_HOUSEHOLD]: data => <HouseholdCreateForm connections={data.connections} />,
    [HOUSEHOLD_TABS.INVITATIONS]: data => <HouseholdInvitationListForm invitations={data.invitations || []} />,
    [HOUSEHOLD_TABS._HOUSEHOLD]: (data, handleSubmit, tab) => (
      <HouseholdModificationForm
        household={data.households?.find(({ key }) => key === tab)}
        connections={data.connections}
        onSubmit={handleSubmit}
      />
    ),
  },
}
