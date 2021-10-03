import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { FORM } from 'shared/constants/localeMessages'
import { MessageIcon, ConnectionsIcon, CalendarIcon, SortAlphaIcon } from 'web/styles/icons'
import { AppendMessageAnchor, AppendMessageIcon } from 'web/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'web/styles/blocks/settings'
import { TableBigPhoto } from 'web/styles/blocks/table'
import { ConnectionActions } from 'web/actions'
import { connectionUnblock } from 'web/effects/conectionEffects'
import { getButtonForUser } from 'web/helpers/connections'

import { InfoTooltip } from '../../portals'
import { FormattedTime, LocaleText, Table } from '../../common'

const ConnectionBlocksForm = ({ data }) => {
  const dispatch = useDispatch()

  const unblockHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionUnblock, data: targetId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText message={FORM.BLOCKED_CONNECTIONS} /> {data?.length ? `(${data.length})` : ''}
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
              ...user
            }) => ({
              ...user,
              photo: <TableBigPhoto src={photo} />,
              mutualConnections: <>({mutualConnections ?? 0} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
              message: message && (
                <AppendMessageAnchor>
                  <InfoTooltip
                    icon={<AppendMessageIcon><MessageIcon /></AppendMessageIcon>}
                    text={message}
                    customHeight={24}
                    customOffsetY={-5}
                  />
                </AppendMessageAnchor>
              ),
              dateCreated: <FormattedTime time={dateCreated} />,
              unblockBtn: getButtonForUser(FORM.UNBLOCK, userId, unblockHandler),
            }))}
            keys={[
              { name: 'photo' },
              { name: 'nickname', bold: true },
              { name: 'mutualConnections', fading: true, growing: true },
              { name: 'message' },
              { name: 'dateCreated', fading: true },
              { name: 'unblockBtn' },
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
