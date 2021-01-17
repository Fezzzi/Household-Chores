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
import { CONNECTION_KEYS } from 'shared/constants/settingsDataKeys'

import { LocaleText, Table } from '../../common'

const ConnectionsListForm = ({ data }) => {
  const dispatch = useDispatch()

  const removeHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionRemove, targetId })),
  [dispatch])

  const blockHandler = useCallback(targetId =>
    dispatch(SettingsActions.connectionAction({ effect: connectionBlock, targetId })),
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
              [CONNECTION_KEYS.ID]: userId,
              [CONNECTION_KEYS.PHOTO]: userPhoto,
              ...user
            }) => ({
              ...user,
              userPhoto: <TableBigPhoto src={userPhoto} />,
              date: getTimeString(user[CONNECTION_KEYS.DATE_CREATED]),
              removeBtn: getButtonForUser(FORM.REMOVE, userId, removeHandler),
              blockBtn: getButtonForUser(FORM.BLOCK, userId, blockHandler),
            }))}
            keys={[
              { name: 'userPhoto' },
              { name: CONNECTION_KEYS.NICKNAME, bold: true, growing: true },
              { name: 'date', fading: true },
              { name: 'removeBtn' },
              { name: 'blockBtn' },
            ]}
            sortConfig={[
              { key: CONNECTION_KEYS.NICKNAME, icon: <SortByAlpha /> },
              { key: CONNECTION_KEYS.DATE_CREATED, icon: <CalendarToday /> },
            ]}
            filterKey={CONNECTION_KEYS.NICKNAME}
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
