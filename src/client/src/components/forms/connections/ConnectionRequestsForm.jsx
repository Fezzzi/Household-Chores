import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { FORM } from 'shared/constants/localeMessages'
import { PORTAL_TYPE } from 'clientSrc/constants'
import { ConnectionsIcon, MessageIcon, CalendarIcon, SortAlphaIcon } from 'clientSrc/styles/icons'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { ConnectionActions } from 'clientSrc/actions'
import { connectionApprove, connectionBlock, connectionIgnore } from 'clientSrc/effects/conectionEffects'
import { getTimeString, getButtonForUser } from 'clientSrc/helpers/connections'

import { LocaleText, Table } from '../../common'
import { MessageTooltip } from '../../portals'

const ConnectionRequestsForm = ({ data }) => {
  const dispatch = useDispatch()

  const blockHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionBlock, data: targetId })),
  [dispatch])

  const approveHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionApprove, data: { targetId } })),
  [dispatch])

  const ignoreHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionIgnore, data: targetId })),
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
              userId,
              photo,
              message,
              mutualConnections,
              dateCreated,
              ...rest
            }) => ({
              photo: <TableBigPhoto src={photo} />,
              mutualConnections: <>({mutualConnections ?? 0} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
              message: message && (
                <AppendMessageAnchor>
                  <MessageTooltip
                    icon={<AppendMessageIcon><MessageIcon /></AppendMessageIcon>}
                    text={message}
                    customOffsetY={-5}
                    customOffsetX={-10}
                    scrollRoot="settingsWrapper"
                    type={PORTAL_TYPE.SETTINGS_TOOLTIPS}
                  />
                </AppendMessageAnchor>
              ),
              dateCreated: getTimeString(dateCreated),
              approveBtn: getButtonForUser(FORM.APPROVE, userId, approveHandler),
              ignoreBtn: getButtonForUser(FORM.IGNORE, userId, ignoreHandler),
              blockBtn: getButtonForUser(FORM.BLOCK, userId, blockHandler),
              ...rest,
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
              { key: 'nickname', icon: <SortAlphaIcon /> },
              { key: 'dateCreated', icon: <CalendarIcon /> },
              { key: 'mutualConnections', icon: <ConnectionsIcon /> },
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
