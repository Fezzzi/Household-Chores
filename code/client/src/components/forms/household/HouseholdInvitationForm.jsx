import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Search, SortByAlpha } from '@material-ui/icons'

import {
  InvitationFormNode, InvitationFormNodeName, InvitationFormNodePhoto, InvitationNodesWrapper,
} from 'clientSrc/styles/blocks/households'
import {
  TableBox, TableHeaderBox, TableHeaderCell, TableSingleRowBox, TableSorterIcon,
} from 'clientSrc/styles/blocks/table'
import { useTableLogic } from 'clientSrc/helpers/table'
import { COMMON, HOUSEHOLD } from 'shared/constants/localeMessages'
import { CONNECTION_KEYS } from 'shared/constants/settingsDataKeys'

import { MiniTextInput, MiniButton, LocaleText } from '../../common'

const HouseholdInvitationForm = ({ connections, onInvite }) => {
  const { processedRows, setQuery, sorters } = useTableLogic(
    connections,
    [{ key: CONNECTION_KEYS.NICKNAME, icon: <SortByAlpha /> }],
    CONNECTION_KEYS.NICKNAME
  )

  const textInputRef = useRef(null)

  return (
    <TableBox>
      <TableHeaderBox>
        <TableHeaderCell growing>{sorters}</TableHeaderCell>
        <TableHeaderCell>
          <TableSorterIcon onClick={() => textInputRef.current.focus()}>
            <Search />
          </TableSorterIcon>
          <MiniTextInput
            reference={textInputRef}
            name="table-filter"
            value={COMMON.SEARCH}
            handleChange={setQuery}
          />
        </TableHeaderCell>
      </TableHeaderBox>
      <TableSingleRowBox height={connections.length ? '130px' : '0px'}>
        <InvitationNodesWrapper>
          {processedRows.map(({
            [CONNECTION_KEYS.ID]: id,
            [CONNECTION_KEYS.NICKNAME]: nickname,
            [CONNECTION_KEYS.PHOTO]: photo,
          }) => (
            <InvitationFormNode key={`connection-${id}`}>
              <InvitationFormNodePhoto src={photo} />
              <InvitationFormNodeName>{nickname}</InvitationFormNodeName>
              <MiniButton margin={0} onClick={() => onInvite(id)}>
                <LocaleText message={HOUSEHOLD.INVITE} />
              </MiniButton>
            </InvitationFormNode>
          ))}
        </InvitationNodesWrapper>
      </TableSingleRowBox>
    </TableBox>
  )
}

HouseholdInvitationForm.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    [CONNECTION_KEYS.ID]: PropTypes.number.isRequired,
    [CONNECTION_KEYS.NICKNAME]: PropTypes.string.isRequired,
    [CONNECTION_KEYS.PHOTO]: PropTypes.string,
  })).isRequired,
  onInvite: PropTypes.func.isRequired,
}

export default HouseholdInvitationForm
