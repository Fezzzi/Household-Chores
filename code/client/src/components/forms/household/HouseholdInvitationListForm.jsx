import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Search } from '@material-ui/icons'

import { InputRow } from 'clientSrc/styles/blocks/form'
import { UserList } from 'clientSrc/styles/blocks/users'
import { SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBox, TableHeaderBox, TableHeaderCell, TableSorterIcon } from 'clientSrc/styles/blocks/table'
import { useTableLogic } from 'clientSrc/helpers/table'
import { COMMON, FORM } from 'shared/constants/localeMessages'
import { INVITATION_KEYS } from 'shared/constants/settingsDataKeys'

import { MiniTextInput, LocaleText } from '../../common'
import HouseholdInvitationNode from './HouseholdInvitationNode'

const HouseholdInvitationListForm = ({ invitations }) => {
  const textInputRef = useRef(null)

  const {
    processedRows,
    setQuery,
  } = useTableLogic(invitations || [], [], INVITATION_KEYS.HOUSEHOLD_NAME)

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
  invitations: PropTypes.array.isRequired,
}

export default HouseholdInvitationListForm
