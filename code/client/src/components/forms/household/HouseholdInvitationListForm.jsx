import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { CalendarToday, ChevronRight, Message, SortByAlpha } from '@material-ui/icons'

import { HouseholdActions, ModalActions } from 'clientSrc/actions'
import { AppendMessageAnchor, AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { FormBody, FormWrapper, SectionHeadline } from 'clientSrc/styles/blocks/settings'
import { TableBigPhoto, TableRowIcon } from 'clientSrc/styles/blocks/table'
import { getTimeString } from 'clientSrc/helpers/connections'
import { FORM } from 'shared/constants/localeMessages'
import { COLORS, MODAL_TYPE } from 'clientSrc/constants'
import { HOUSEHOLD_KEYS, INVITATION_KEYS, PROFILE } from 'shared/constants/mappingKeys'

import { LocaleText, PrimaryButton, Table } from '../../common'
import { InfoTooltip } from '../../portals'

const HouseholdInvitationListForm = ({ invitations }) => {
  const {
    [PROFILE.PHOTO]: photo,
    [PROFILE.NAME]: name,
  } = useSelector(({ app: { user } }) => user)

  const dispatch = useDispatch()
  const approveHandler = useCallback((householdId, fromId) =>
    dispatch(ModalActions.openModal({
      type: MODAL_TYPE.INVITATION_ACCEPT,
      data: {
        userName: name,
        userPhoto: photo,
        onSubmit: (nameAlis, photoAlias) => dispatch(HouseholdActions.approveInvitation({
          [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
          [INVITATION_KEYS.FROM_ID]: fromId,
          [HOUSEHOLD_KEYS.USER_NAME]: nameAlis ?? name,
          [HOUSEHOLD_KEYS.USER_PHOTO]: photoAlias ?? photo,
        })),
      },
    })),
  [name, photo, dispatch])

  const ignoreHandler = useCallback((householdId, fromId) =>
    dispatch(HouseholdActions.ignoreInvitation({
      [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
      [INVITATION_KEYS.FROM_ID]: fromId,
    })),
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
              [INVITATION_KEYS.FROM_ID]: fromId,
              [INVITATION_KEYS.HOUSEHOLD_ID]: householdId,
              [INVITATION_KEYS.FROM_PHOTO]: fromPhoto,
              [INVITATION_KEYS.HOUSEHOLD_PHOTO]: householdPhoto,
              [INVITATION_KEYS.MESSAGE]: invitationMessage,
              ...invitation
            }) => ({
              ...invitation,
              fromPhoto: <TableBigPhoto src={fromPhoto} />,
              householdPhoto: <TableBigPhoto src={householdPhoto} />,
              delimiter: <TableRowIcon><ChevronRight /></TableRowIcon>,
              invitationMessage: invitationMessage && (
                <AppendMessageAnchor>
                  <InfoTooltip
                    icon={<AppendMessageIcon><Message /></AppendMessageIcon>}
                    text={invitationMessage}
                    customHeight={24}
                    customOffsetY={-5}
                  />
                </AppendMessageAnchor>
              ),
              date: getTimeString(invitation[INVITATION_KEYS.DATE_CREATED]),
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
              { name: INVITATION_KEYS.FROM_NICKNAME, bold: true },
              { name: 'delimiter' },
              { name: 'householdPhoto' },
              { name: INVITATION_KEYS.HOUSEHOLD_NAME, bold: true, growing: true },
              { name: 'invitationMessage' },
              { name: 'date', fading: true },
              { name: 'approveBtn' },
              { name: 'ignoreBtn' },
            ]}
            sortConfig={[
              { key: INVITATION_KEYS.HOUSEHOLD_NAME, icon: <SortByAlpha /> },
              { key: INVITATION_KEYS.DATE_CREATED, icon: <CalendarToday /> },
            ]}
            defaultSorter={-2}
            filterKey={INVITATION_KEYS.FROM_NICKNAME}
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
