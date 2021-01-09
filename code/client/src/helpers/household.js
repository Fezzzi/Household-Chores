import React from 'react'
import { CalendarToday, ChevronRight, Delete, Cancel, Grade, MoreVert, SortByAlpha } from '@material-ui/icons'

import { COLORS } from 'clientSrc/constants'
import { OptionsTooltip } from 'clientSrc/components/portals'
import { TablePhoto, TableRowIcon } from 'clientSrc/styles/blocks/table'
import { RoleLabel, UserLabel } from 'clientSrc/styles/blocks/households'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { formatDate } from 'shared/helpers/date'

export const useMemberListProps = (
  members,
  currentUser,
  checkCancellability,
  handleRoleChange,
  handleDeletion,
  handleCancellation
) => {
  const rows = members.map(({
    memberId,
    memberName,
    memberRole,
    memberPhoto,
    memberDateJoined,
  }) => {
    const moreOptions = []
    const allowCancellation = checkCancellability(memberId) && handleCancellation
    if (currentUser.id === memberId) {
      const allRoles = Object.values(HOUSEHOLD_ROLE_TYPE)
      const userRoleIndex = allRoles.indexOf(currentUser.role)
      const availableRoles = allRoles.filter(role => userRoleIndex <= allRoles.indexOf(role))
      if (availableRoles.length > 1 && handleRoleChange) {
        moreOptions.push({
          content: HOUSEHOLD.CHANGE_ROLE,
          nestedOptions: availableRoles.map(role => ({
            content: <UserLabel><RoleLabel {...getLabelColors(role)}>{role}</RoleLabel></UserLabel>,
            clickHandler: role !== memberRole
              ? () => handleRoleChange(memberId, role)
              : null,
          })),
        })
      }

      if (allowCancellation) {
        moreOptions.push({
          content: HOUSEHOLD.CANCEL_REMOVE_USER,
          clickHandler: () => handleCancellation(memberId),
        })
      }

      const deletable = !allowCancellation && currentUser.role === HOUSEHOLD_ROLE_TYPE.ADMIN && handleDeletion
      if (deletable) {
        moreOptions.push({
          content: HOUSEHOLD.REMOVE_USER,
          clickHandler: () => handleDeletion(memberId),
        })
      }
    }

    return {
      name: memberName,
      photo: <TablePhoto src={memberPhoto} />,
      role: <RoleLabel {...getLabelColors(memberRole)}>{memberRole}</RoleLabel>,
      roleString: memberRole,
      delimiter: 'since',
      dateJoined: formatDate(memberDateJoined, false),
      more: moreOptions.length < 1
        ? undefined
        : <OptionsTooltip icon={<MoreVert />} options={moreOptions} />,
      strikethrough: allowCancellation,
    }
  })

  const keys = [
    { name: 'photo' },
    { name: 'name', bold: true, growing: true },
    { name: 'role' },
    { name: 'delimiter', fading: true },
    { name: 'dateJoined', fading: true },
    { name: 'more' },
  ]
  const sortConfig = [
    { key: 'name', icon: <SortByAlpha /> },
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
    strikethrough: allowCancellation && handleCancellation,
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
