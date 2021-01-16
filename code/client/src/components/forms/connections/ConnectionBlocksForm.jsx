import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CalendarToday, Group, Message, SortByAlpha } from '@material-ui/icons'

import { SettingsActions } from 'clientSrc/actions'
import { connectionUnblock } from 'clientSrc/effects/conectionEffects'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { InfoTooltip } from 'clientSrc/components/portals'
import { getButtonForUser, getTimeString } from 'clientSrc/helpers/connections'
import { FORM } from 'shared/constants/localeMessages'
import { CONNECTION_KEYS } from 'shared/constants/settingsDataKeys'

import { LocaleText, Table } from '../../common'

const ConnectionBlocksForm = ({ data }) => {
  const dispatch = useDispatch()

  const unblockHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionUnblock, targetId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText
          message={FORM.BLOCKED_CONNECTIONS}
          modifierFunc={data?.length ? text => `${text} (${data.length})` : undefined}
        />
      </SectionHeadline>
      {data?.length
        ? <Table
          rows={data.map(({
            [CONNECTION_KEYS.ID]: userId,
            [CONNECTION_KEYS.PHOTO]: userPhoto,
            [CONNECTION_KEYS.MESSAGE]: userMessage,
            [CONNECTION_KEYS.MUTUAL_CONNECTIONS]: userMutualConnections,
            ...user
          }) => ({
            ...user,
            userPhoto: <TableBigPhoto src={userPhoto} />,
            userMutualConnections: <>({userMutualConnections} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
            userMessage: userMessage && (
              <AppendMessageAnchor>
                <InfoTooltip
                  icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                  text={userMessage}
                  customHeight={24}
                  customOffsetY={-5}
                />
              </AppendMessageAnchor>
            ),
            date: getTimeString(user[CONNECTION_KEYS.DATE_CREATED]),
            unblockBtn: getButtonForUser(FORM.CONNECTION_UNBLOCK, userId, unblockHandler),
          }))}
          keys={[
            { name: 'userPhoto' },
            { name: CONNECTION_KEYS.NICKNAME, bold: true },
            { name: 'userMutualConnections', fading: true, growing: true },
            { name: 'userMessage' },
            { name: 'date', fading: true },
            { name: 'unblockBtn' },
          ]}
          sortConfig={[
            { key: CONNECTION_KEYS.NICKNAME, icon: <SortByAlpha /> },
            { key: CONNECTION_KEYS.DATE_CREATED, icon: <CalendarToday /> },
            { key: CONNECTION_KEYS.MUTUAL_CONNECTIONS, icon: <Group /> },
          ]}
          defaultSorter={-2}
          filterKey={CONNECTION_KEYS.NICKNAME}
          bigCells
          freeHeight
        />
        : (
          <FormBody>
            <LocaleText message={FORM.NO_BLOCKED_CONNECTIONS} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

ConnectionBlocksForm.propTypes = {
  data: PropTypes.array,
}

export default ConnectionBlocksForm
