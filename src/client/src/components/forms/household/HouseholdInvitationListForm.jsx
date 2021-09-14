import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { FORM } from 'shared/constants/localeMessages'
import { COLORS, MODAL_TYPE } from 'clientSrc/constants'
import { MessageIcon, CalendarIcon, SortAlphaIcon, ChevronRightIcon } from 'clientSrc/styles/icons'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto, TableRowIcon } from 'clientSrc/styles/blocks/table'
import { HouseholdActions, ModalActions } from 'clientSrc/actions'
import { getTimeString } from 'clientSrc/helpers/connections'

import { LocaleText, PrimaryButton, Table } from '../../common'
import { InfoTooltip } from '../../portals'

const HouseholdInvitationListForm = ({ invitations }) => {
  const { photo, nickname } = useSelector(({ app: { user } }) => user)

  const dispatch = useDispatch()
  const approveHandler = useCallback((householdId, fromId) =>
    dispatch(ModalActions.openModal({
      type: MODAL_TYPE.INVITATION_ACCEPT,
      data: {
        userNickname: nickname,
        userPhoto: photo,
        onSubmit: (nameAlis, photoAlias) => dispatch(HouseholdActions.approveInvitation({
          householdId,
          fromId,
          userNickname: nameAlis ?? nickname,
          userPhoto: photoAlias ?? photo,
        })),
      },
    })),
  [nickname, photo, dispatch])

  const ignoreHandler = useCallback((householdId, fromId) =>
    dispatch(HouseholdActions.ignoreInvitation({ householdId, fromId })),
  [dispatch])

  return (
    <FormWrapper>
      <SectionHeadline first>
        <LocaleText
          message={FORM.HOUSEHOLD_INVITATIONS}
          modifierFunc={invitations?.length ? text => `${text} (${invitations.length})` : undefined}
        />
      </SectionHeadline>
      {invitations?.length
        ? (
          <Table
            rows={invitations.map(({
              fromId,
              householdId,
              fromPhoto,
              householdPhoto,
              message,
              dateCreated,
              ...invitation
            }) => ({
              ...invitation,
              fromPhoto: <TableBigPhoto src={fromPhoto} />,
              householdPhoto: <TableBigPhoto src={householdPhoto} />,
              delimiter: <TableRowIcon><ChevronRightIcon /></TableRowIcon>,
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
              approveBtn: (
                <PrimaryButton
                  onClick={() => approveHandler(householdId, fromId)}
                  margin="2px 0 1px"
                  background={COLORS.BLUE_PRIMARY}
                  backgroundHover={COLORS.BLUE_SECONDARY}
                >
                  <LocaleText message={FORM.APPROVE} />
                </PrimaryButton>
              ),
              ignoreBtn: (
                <PrimaryButton
                  onClick={() => ignoreHandler(householdId, fromId)}
                  margin="2px 0 1px"
                  color={COLORS.FONT}
                  background={COLORS.LIGHT_PRIMARY}
                  backgroundHover={COLORS.LIGHT_SECONDARY}
                >
                  <LocaleText message={FORM.IGNORE} />
                </PrimaryButton>
              ),
            }))}
            keys={[
              { name: 'fromPhoto' },
              { name: 'fromNickname', bold: true },
              { name: 'delimiter' },
              { name: 'householdPhoto' },
              { name: 'householdName', bold: true, growing: true },
              { name: 'message' },
              { name: 'dateCreated', fading: true },
              { name: 'approveBtn' },
              { name: 'ignoreBtn' },
            ]}
            sortConfig={[
              { key: 'householdName', icon: <SortAlphaIcon /> },
              { key: 'dateCreated', icon: <CalendarIcon /> },
            ]}
            defaultSorter={-2}
            filterKey="fromNickname"
            bigCells
            freeHeight
          />
        ) : (
          <FormBody>
            <LocaleText message={FORM.NO_HOUSEHOLD_REQUESTS} />
          </FormBody>
        )}
    </FormWrapper>
  )
}

HouseholdInvitationListForm.propTypes = {
  invitations: PropTypes.array.isRequired,
}

export default HouseholdInvitationListForm
