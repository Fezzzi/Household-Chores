import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CalendarToday, Message, SortByAlpha, Group } from '@material-ui/icons'

import { SettingsActions } from 'clientSrc/actions'
import { connectionApprove, connectionBlock, connectionIgnore } from 'clientSrc/effects/conectionEffects'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { getTimeString, getButtonForUser } from 'clientSrc/helpers/connections'
import { FORM } from 'shared/constants/localeMessages'
import { CONNECTION_KEYS } from 'shared/constants/settingsDataKeys'

import { LocaleText, Table } from '../../common'
import { InfoTooltip } from '../../portals'

const ConnectionRequestsForm = ({ data }) => {
  const dispatch = useDispatch()

  const blockHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionBlock, targetId })),
  [dispatch])

  const approveHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionApprove, targetId })),
  [dispatch])

  const ignoreHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionIgnore, targetId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText
          message={FORM.PENDING_CONNECTIONS}
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
            approveBtn: getButtonForUser(FORM.CONNECTION_APPROVE, userId, approveHandler),
            ignoreBtn: getButtonForUser(FORM.CONNECTION_IGNORE, userId, ignoreHandler),
            blockBtn: getButtonForUser(FORM.CONNECTION_BLOCK, userId, blockHandler),
          }))}
          keys={[
            { name: 'userPhoto' },
            { name: CONNECTION_KEYS.NICKNAME, bold: true },
            { name: 'userMutualConnections', fading: true, growing: true },
            { name: 'userMessage' },
            { name: 'date', fading: true },
            { name: 'approveBtn' },
            { name: 'ignoreBtn' },
            { name: 'blockBtn' },
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
            <LocaleText message={FORM.NO_CONNECTION_REQUESTS} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

ConnectionRequestsForm.propTypes = {
  data: PropTypes.array,
}

export default ConnectionRequestsForm
