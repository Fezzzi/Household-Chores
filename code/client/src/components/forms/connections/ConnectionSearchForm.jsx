import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { InputRow } from 'clientSrc/styles/blocks/form'
import { UserList } from 'clientSrc/styles/blocks/users'
import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox } from 'clientSrc/styles/blocks/table'
import * as SettingsActions from 'clientSrc/actions/settingsActions'
import { FORM } from 'shared/constants/localeMessages'

import UserConnectionNode from './UserConnectionNode'
import LocaleText from '../../common/LocaleText'
import SearchBar from '../common/SearchBar'

const ConnectionSearchForm = ({ tab, data, dataKey, emptyMessage, headlineMessage }) => {
  const dispatch = useDispatch()
  const searchQuery = useCallback(query =>
    dispatch(SettingsActions.searchConnectionAction(query)),
  [dispatch])

  const emptyResultMessage = useMemo(() => {
    if (data[dataKey]?.length === 0) {
      return FORM.NO_CONNECTIONS_FOUND
    }
    return emptyMessage
  }, [data[dataKey]])

  return (
    <>
      <SectionHeadline first>
        <LocaleText message={headlineMessage} />
      </SectionHeadline>
      <TableBox>
        <TableHeaderBox isBigger>
          <SearchBar searchQuery={searchQuery} />
        </TableHeaderBox>
      </TableBox>
      {data[dataKey]?.length
        ? (
          <UserList>
            {data[dataKey].map((user, index) => (
              <UserConnectionNode
                key={`${dataKey}-${index}`}
                user={user}
                tab={tab}
              />
            ))}
          </UserList>
        ) : (
          <InputRow>
            <LocaleText message={emptyResultMessage} />
          </InputRow>
        )}
    </>
  )
}

ConnectionSearchForm.defaultProps = {
  emptyMessage: '',
}

ConnectionSearchForm.propTypes = {
  tab: PropTypes.string.isRequired,
  data: PropTypes.object,
  dataKey: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string,
  headlineMessage: PropTypes.string.isRequired,
}

export default ConnectionSearchForm
