import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Search } from '@material-ui/icons'

import { InputRow } from 'clientSrc/styles/blocks/form'
import { UserList } from 'clientSrc/styles/blocks/users'
import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell, TableSorterIcon } from 'clientSrc/styles/blocks/table'
import { useTableLogic } from 'clientSrc/helpers/table'
import { COMMON, FORM } from 'shared/constants/localeMessages'

import { MiniTextInput } from '../../common'
import HouseholdInvitationNode from './HouseholdInvitationNode'
import LocaleText from '../../common/LocaleText'

const HouseholdInvitationListForm = ({ invitations }) => {
  const textInputRef = useRef(null)

  const {
    processedRows,
    setQuery,
  } = useTableLogic(invitations || [], [], 'name')

  return (
    <>
      <SectionHeadline first>
        <LocaleText
          message={FORM.HOUSEHOLD_INVITATIONS}
          modifierFunc={invitations?.length ? text => `${text} (${invitations.length})` : undefined}
        />
      </SectionHeadline>
      {invitations?.length
        ? (
          <>
            <TableBox>
              <TableHeaderBox>
                <TableHeaderCell growing />
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
            </TableBox>
            <UserList>
              {processedRows.map((invitation, index) => (
                <HouseholdInvitationNode
                  key={`invitations-${index}`}
                  invitation={invitation}
                />
              )
              )}
            </UserList>
          </>
        ) : (
          <InputRow>
            <LocaleText message={FORM.NO_HOUSEHOLD_REQUESTS} />
          </InputRow>
        )}
    </>
  )
}

HouseholdInvitationListForm.propTypes = {
  invitations: PropTypes.arrayOf(
    PropTypes.shape({
      fromId: PropTypes.number.isRequired,
      fromNickname: PropTypes.string.isRequired,
      fromPhoto: PropTypes.string.isRequired,
      id_household: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string,
      photo: PropTypes.string,
    })
  ).isRequired,
}

export default HouseholdInvitationListForm