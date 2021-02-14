import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { CalendarToday, SortByAlpha } from '@material-ui/icons'

import { SettingsActions } from 'clientSrc/actions'
import { connectionBlock, connectionRemove } from 'clientSrc/effects/conectionEffects'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto } from 'clientSrc/styles/blocks/table'
import { getButtonForUser, getTimeString } from 'clientSrc/helpers/connections'
import { FORM } from 'shared/constants/localeMessages'

import { LocaleText, Table } from '../../common'

const ConnectionsListForm = ({ data }) => {
  const dispatch = useDispatch()

  const removeHandler = useCallback(userId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionRemove, userId })),
  [dispatch])

  const blockHandler = useCallback(userId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionBlock, userId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText
          message={FORM.MY_CONNECTIONS}
          modifierFunc={data?.length ? text => `${text} (${data.length})` : undefined}
        />
      </SectionHeadline>
      {data?.length
        ? (
          <Table
            rows={data.map(({
              userId,
              photo,
              dateCreated,
              ...user
            }) => ({
              ...user,
              photo: <TableBigPhoto src={photo} />,
              dateCreated: getTimeString(dateCreated),
              removeBtn: getButtonForUser(FORM.REMOVE, userId, removeHandler),
              blockBtn: getButtonForUser(FORM.BLOCK, userId, blockHandler),
            }))}
            keys={[
              { name: 'photo' },
              { name: 'nickname', bold: true, growing: true },
              { name: 'dateCreated', fading: true },
              { name: 'removeBtn' },
              { name: 'blockBtn' },
            ]}
            sortConfig={[
              { key: 'nickname', icon: <SortByAlpha /> },
              { key: 'dateCreated', icon: <CalendarToday /> },
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
