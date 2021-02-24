import React from 'react'

import {
  ConnectionRequestsForm, ConnectionSearchForm, HouseholdCreateForm, HouseholdModificationForm, DialogsForm,
  HouseholdInvitationListForm, ProfileForm, NotificationForm, ConnectionsListForm, ConnectionBlocksForm,
} from 'clientSrc/components/forms'
import { AboutPage, ContributePage, SupportPage } from 'clientSrc/components/settings/more'
import {
  SETTING_CATEGORIES, CONNECTION_TABS, PROFILE_TABS, HOUSEHOLD_TABS, CONNECTION_STATE_TYPE, MORE_TABS,
} from 'shared/constants'

export const settingsRenderers = {
  [SETTING_CATEGORIES.PROFILE]: {
    [PROFILE_TABS.GENERAL]: (data, handleSubmit) => <ProfileForm data={data} onSubmit={handleSubmit} />,
    [PROFILE_TABS.NOTIFICATIONS]: (data, handleSubmit) => <NotificationForm data={data} onSubmit={handleSubmit} />,
    [PROFILE_TABS.DIALOGS]: (data, handleSubmit) => <DialogsForm data={data} onSubmit={handleSubmit} />,
  },
  [SETTING_CATEGORIES.CONNECTIONS]: {
    tabModifiers: data => tab => {
      switch (tab) {
        case CONNECTION_TABS.MY_CONNECTIONS: return ` (${data[CONNECTION_STATE_TYPE.APPROVED]?.length || 0})`
        case CONNECTION_TABS.PENDING: return ` (${data[CONNECTION_STATE_TYPE.WAITING]?.length || 0})`
        case CONNECTION_TABS.BLOCKED: return ` (${data[CONNECTION_STATE_TYPE.BLOCKED]?.length || 0})`
        default: return ''
      }
    },
    [CONNECTION_TABS.MY_CONNECTIONS]: data => <ConnectionsListForm data={data[CONNECTION_STATE_TYPE.APPROVED]} />,
    [CONNECTION_TABS.FIND_CONNECTION]: data => <ConnectionSearchForm data={data[CONNECTION_STATE_TYPE.FOUND]} />,
    [CONNECTION_TABS.PENDING]: data => <ConnectionRequestsForm data={data[CONNECTION_STATE_TYPE.WAITING]} />,
    [CONNECTION_TABS.BLOCKED]: data => <ConnectionBlocksForm data={data[CONNECTION_STATE_TYPE.BLOCKED]} />,
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
  [SETTING_CATEGORIES.MORE]: {
    [MORE_TABS.ABOUT]: data => <AboutPage {...data} />,
    [MORE_TABS.SUPPORT]: () => <SupportPage />,
    [MORE_TABS.CONTRIBUTE]: () => <ContributePage />,
  },
}
