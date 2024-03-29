import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { FORM } from 'shared/constants/localeMessages'
import { CalendarIcon, SortAlphaIcon } from 'web/styles/icons'
import { FormBody, FormWrapper, SectionHeadline } from 'web/styles/blocks/settings'
import { TableBigPhoto } from 'web/styles/blocks/table'
import { ConnectionActions } from 'web/actions'
import { connectionBlock, connectionRemove } from 'web/effects/conectionEffects'
import { getButtonForUser } from 'web/helpers/connections'

import { FormattedTime, LocaleText, Table } from '../../common'

const ConnectionsListForm = ({ data }) => {
  const dispatch = useDispatch()

  const removeHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionRemove, data: targetId })),
  [dispatch])

  const blockHandler = useCallback(targetId =>
    dispatch(ConnectionActions.connectionAction({ effect: connectionBlock, data: targetId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText message={FORM.MY_CONNECTIONS} /> {data?.length ? `(${data.length})` : ''}
      </SectionHeadline>
      {data?.length
        ? (
          <Table
            rows={data.map(({
              userId,
              photo,
              dateCreated,
              mutualConnections,
              ...user
            }) => ({
              ...user,
              photo: <TableBigPhoto src={photo} />,
              mutualConnections: <>({mutualConnections ?? 0} <LocaleText message={FORM.MUTUAL_FRIENDS} />)</>,
              dateCreated: <FormattedTime time={dateCreated} />,
              removeBtn: getButtonForUser(FORM.REMOVE, userId, removeHandler),
              blockBtn: getButtonForUser(FORM.BLOCK, userId, blockHandler),
            }))}
            keys={[
              { name: 'photo' },
              { name: 'nickname', bold: true },
              { name: 'mutualConnections', fading: true, growing: true },
              { name: 'dateCreated', fading: true },
              { name: 'removeBtn' },
              { name: 'blockBtn' },
            ]}
            sortConfig={[
              { key: 'nickname', icon: <SortAlphaIcon /> },
              { key: 'dateCreated', icon: <CalendarIcon /> },
            ]}
            filterKey="nickname"
            bigCells
            freeHeight
          />
        ) : (
          <FormBody>
            <LocaleText message={FORM.NO_CONNECTIONS} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

ConnectionsListForm.propTypes = {
  data: PropTypes.array,
}

export default ConnectionsListForm
