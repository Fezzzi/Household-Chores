import React from 'react'
import { CalendarToday, ChevronRight, Delete, Cancel, Grade, MoreVert, SortByAlpha } from '@material-ui/icons'

import { COLORS } from 'clientSrc/constants'
import { OptionsTooltip } from 'clientSrc/components/portals'
import { TablePhoto, TableRowIcon } from 'clientSrc/styles/blocks/table'
import { RoleLabel } from 'clientSrc/styles/blocks/households'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { MEMBER_KEYS } from 'shared/constants/settingsDataKeys'
import { formatDate } from 'shared/helpers/date'

// todo: Add real clickHandlers
export const useMemberListProps = members => {
  const rows = members.map(({
    [MEMBER_KEYS.ID]: memberId,
    [MEMBER_KEYS.ROLE]: memberRole,
    [MEMBER_KEYS.PHOTO]: memberPhoto,
    [MEMBER_KEYS.DATE_JOINED]: memberDateJoined,
    ...member
  }) => ({
    ...member,
    photo: <TablePhoto src={memberPhoto} />,
    role: <RoleLabel {...getLabelColors(memberRole)}>{memberRole}</RoleLabel>,
    roleString: memberRole,
    delimiter: 'since',
    dateJoined: formatDate(memberDateJoined, false),
    more: <OptionsTooltip
      icon={<MoreVert />}
      options={[
        {
          content: HOUSEHOLD.CHANGE_ROLE,
          nestedOptions: Object.values(HOUSEHOLD_ROLE_TYPE).map(role => ({
            content: <RoleLabel {...getLabelColors(role)}>{role}</RoleLabel>,
            clickHandler: role !== memberRole
              ? () => console.log('changing role of ', memberId, 'to: ', role)
              : null,
          })),
        }, {
          content: HOUSEHOLD.REMOVE_USER,
          clickHandler: () => console.log('removing user', memberId),
        },
      ]}
    />,
  }))
  const keys = [
    { name: 'photo' },
    { name: MEMBER_KEYS.NAME, bold: true, growing: true },
    { name: 'role' },
    { name: 'delimiter', fading: true },
    { name: 'dateJoined', fading: true },
    { name: 'more' },
  ]
  const sortConfig = [
    { key: MEMBER_KEYS.NAME, icon: <SortByAlpha /> },
    { key: 'roleString', icon: <Grade /> },
    { key: 'dateJoined', icon: <CalendarToday /> },
  ]
  const filterKey = 'nickname'

  return {
    rows,
    keys,
    sortConfig,
    filterKey,
  }
}

export const useInvitationListProps = (invitations, handleDeletion, handleCancellation) => {
  const rows = invitations.map(({
    fromPhoto,
    toPhoto,
    fromId,
    toId,
    disableDeletion,
    allowCancellation,
    ...invitation
  }) => ({
    ...invitation,
    fromPhoto: <TablePhoto src={fromPhoto} />,
    delimiter: <TableRowIcon><ChevronRight /></TableRowIcon>,
    toPhoto: <TablePhoto src={toPhoto} />,
    delete: disableDeletion || !handleDeletion
      ? undefined
      : (
        <TableRowIcon
          color={COLORS.RED_SECONDARY}
          clickable
          onClick={() => handleDeletion(toId)}
        >
          <Delete />
        </TableRowIcon>
      ),
    cancel: !allowCancellation || !handleCancellation
      ? undefined
      : (
        <TableRowIcon
          color={COLORS.GREEN_SECONDARY}
          clickable
          onClick={() => handleCancellation(toId)}
        >
          <Cancel />
        </TableRowIcon>
      ),
  }))
  const keys = [
    { name: 'fromPhoto' },
    { name: 'fromNickname' },
    { name: 'delimiter' },
    { name: 'toPhoto' },
    { name: 'toNickname', bold: true, growing: true },
    { name: 'dateCreated', fading: true },
    { name: 'delete' },
    { name: 'cancel' },
  ]
  const sortConfig = [
    { key: 'toNickname', icon: <SortByAlpha /> },
    { key: 'dateCreated', icon: <CalendarToday /> },
  ]
  const filterKey = 'toNickname'

  return {
    rows,
    keys,
    sortConfig,
    filterKey,
  }
}

export const getLabelColors = role => role === HOUSEHOLD_ROLE_TYPE.ADMIN
  ? { background: COLORS.BLUE_PRIMARY, color: COLORS.THEME_BACK }
  : role === HOUSEHOLD_ROLE_TYPE.MANAGER
    ? { background: COLORS.YELLOW_PRIMARY, color: COLORS.THEME_BACK }
    : { background: COLORS.GREEN_PRIMARY, color: COLORS.THEME_BACK }
