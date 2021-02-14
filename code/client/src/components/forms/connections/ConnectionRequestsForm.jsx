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
import { PORTAL_TYPE } from 'clientSrc/constants'

import { LocaleText, Table } from '../../common'
import { MessageTooltip } from '../../portals'

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
        ? (
          <Table
            rows={data.map(({
              id,
              photo,
              message,
              mutualConnections,
              dateCreated,
            }) => ({
              photo: <TableBigPhoto src={photo} />,
              mutualConnections: <>({mutualConnections} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
              message: message && (
                <AppendMessageAnchor>
                  <MessageTooltip
                    icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                    text={message}
                    customOffsetY={-5}
                    customOffsetX={-10}
                    scrollRoot="settingsWrapper"
                    type={PORTAL_TYPE.SETTINGS_TOOLTIPS}
                  />
                </AppendMessageAnchor>
              ),
              dateCreated: getTimeString(dateCreated),
              approveBtn: getButtonForUser(FORM.APPROVE, id, approveHandler),
              ignoreBtn: getButtonForUser(FORM.IGNORE, id, ignoreHandler),
              blockBtn: getButtonForUser(FORM.BLOCK, id, blockHandler),
            }))}
            keys={[
              { name: 'photo' },
              { name: 'nickname', bold: true },
              { name: 'mutualConnections', fading: true, growing: true },
              { name: 'message' },
              { name: 'dateCreated', fading: true },
              { name: 'approveBtn' },
              { name: 'ignoreBtn' },
              { name: 'blockBtn' },
            ]}
            sortConfig={[
              { key: 'nickname', icon: <SortByAlpha /> },
              { key: 'dateCreated', icon: <CalendarToday /> },
              { key: 'mutualConnections', icon: <Group /> },
            ]}
            defaultSorter={-2}
            filterKey="nickname"
            bigCells
            freeHeight
          />
        ) : (
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
