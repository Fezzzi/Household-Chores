import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { FORM } from 'shared/constants/localeMessages'
import { MessageIcon, ConnectionsIcon, CalendarIcon, SortAlphaIcon } from 'clientSrc/styles/icons'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { ConnectionActions } from 'clientSrc/actions'
import { connectionUnblock } from 'clientSrc/effects/conectionEffects'
import { getButtonForUser, getTimeString } from 'clientSrc/helpers/connections'

import { InfoTooltip } from '../../portals'
import { LocaleText, Table } from '../../common'

const ConnectionBlocksForm = ({ data }) => {
  const dispatch = useDispatch()

  const unblockHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionUnblock, data: targetId })),
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
              dateCreated: getTimeString(dateCreated),
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
