import React from 'react'

import { COLORS, PORTAL_TYPE } from 'clientSrc/constants'
import { HOUSEHOLD } from 'shared/constants/localeMessages'
import { HOUSEHOLD_ROLE_TYPE } from 'shared/constants'
import {
  MessageIcon, CancelIcon, CalendarIcon, DeleteIcon, MoreVertIcon, SortAlphaIcon, ChevronRightIcon, StartIcon,
} from 'clientSrc/styles/icons'
import { TablePhoto, TableRowIcon } from 'clientSrc/styles/blocks/table'
import { RoleLabel, UserLabel } from 'clientSrc/styles/blocks/households'
import { AppendMessageIcon } from 'clientSrc/styles/blocks/users'
import { useOpenConfirmationDialog } from 'clientSrc/helpers/confirmations'
import { formatDate } from 'shared/helpers/date'
import { MessageTooltip, OptionsTooltip } from 'clientSrc/components/portals'
import LocaleText from 'clientSrc/components/common/LocaleText'

export const useMemberListProps = (
  members,
  currentUser,
  checkCancellability,
  handleRoleChange,
  handleDeletion,
  handleCancellation
) => {
  const openConfirmationDialog = useOpenConfirmationDialog()

  const rows = members.map(({
    memberId,
    memberName,
    memberRole,
    changedRole,
    memberPhoto,
    memberDateJoined,
  }) => {
    const moreOptions = []
    const allowCancellation = checkCancellability(memberId) && handleCancellation
    const currentMemberRole = changedRole ?? memberRole

    if (currentUser.userId !== memberId) {
      const allRoles = Object.values(HOUSEHOLD_ROLE_TYPE)
      const userRoleIndex = allRoles.indexOf(currentUser.role)
      const memberRoleIndex = allRoles.indexOf(memberRole)
      const availableRoles = memberRoleIndex > userRoleIndex
        ? allRoles.filter(role => userRoleIndex <= allRoles.indexOf(role))
        : []

      if (availableRoles.length > 1 && handleRoleChange) {
        moreOptions.push({
          content: HOUSEHOLD.CHANGE_ROLE,
          nestedOptions: availableRoles.map(role => ({
            content: <UserLabel><RoleLabel {...getLabelColors(role)}>{role}</RoleLabel></UserLabel>,
            clickHandler: role !== currentMemberRole
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
          clickHandler: () => openConfirmationDialog(() => handleDeletion(memberId), 'householdMemberDeleting'),
        })
      }
    }

    return {
      name: memberName,
      photo: <TablePhoto src={memberPhoto} />,
      role: <RoleLabel {...getLabelColors(currentMemberRole)}>{currentMemberRole}</RoleLabel>,
      roleString: currentMemberRole,
      delimiter: <LocaleText message={HOUSEHOLD.SINCE} />,
      dateJoined: formatDate(memberDateJoined, false),
      more: moreOptions.length < 1
        ? undefined
        : <OptionsTooltip icon={<MoreVertIcon />} options={moreOptions} />,
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
    { key: 'name', icon: <SortAlphaIcon /> },
    { key: 'roleString', icon: <StartIcon /> },
    { key: 'dateJoined', icon: <CalendarIcon /> },
  ]
  const filterKey = 'name'

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
    message,
    disableDeletion,
    allowCancellation,
    ...invitation
  }) => ({
    ...invitation,
    fromPhoto: <TablePhoto src={fromPhoto} />,
    delimiter: <TableRowIcon><ChevronRightIcon /></TableRowIcon>,
    toPhoto: <TablePhoto src={toPhoto} />,
    message: message && (
      <MessageTooltip
        icon={<AppendMessageIcon><MessageIcon /></AppendMessageIcon>}
        text={message}
        customOffsetY={-5}
        customOffsetX={-10}
        scrollRoot="settingsWrapper"
        type={PORTAL_TYPE.SETTINGS_TOOLTIPS}
      />
    ),
    delete: disableDeletion || !handleDeletion
      ? undefined
      : (
        <TableRowIcon
          color={COLORS.RED_SECONDARY}
          clickable
          onClick={() => handleDeletion(toId)}
        >
          <DeleteIcon />
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
          <CancelIcon />
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
    { name: 'message' },
    { name: 'dateCreated', fading: true },
    { name: 'delete' },
    { name: 'cancel' },
  ]
  const sortConfig = [
    { key: 'toNickname', icon: <SortAlphaIcon /> },
    { key: 'dateCreated', icon: <CalendarIcon /> },
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
