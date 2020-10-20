import React from "react";
import {CalendarToday, ChevronRight, Delete, Grade, MoreVert, SortByAlpha} from "@material-ui/icons";

import { invitationApprove, invitationIgnore } from 'clientSrc/effects/householdEffects';
import {TablePhoto, TableRowIcon} from "clientSrc/styles/blocks/table";
import {RoleLabel} from "clientSrc/styles/blocks/households";
import {OptionsTooltip} from "clientSrc/components/portals/tooltips/OptionsTooltip";
import * as NotificationTypes from 'shared/constants/notificationTypes';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';
import {ERROR, HOUSEHOLD} from 'shared/constants/localeMessages';
import {Table} from "clientSrc/components/common";

export const useHouseholdButtonHandlers = (householdId, fromId, setData, addNotification) => {
  const approveHandler = () => invitationApprove({ householdId, fromId, photo: '' })
    .then(({ data: { success, data } }) => success && setData(data))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  const removeHandler = () => invitationIgnore({ householdId, fromId })
    .then(({ data: { success } }) => success && setData(prevData => ({
      ...prevData,
      invitations: prevData.invitations.filter(({ id_household: idHousehold, from: { id } }) =>
        idHousehold !== householdId && id !== fromId
      ),
    })))
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR));

  return {
    approveHandler,
    removeHandler,
  };
};

// todo: Add real clickHandlers
export const useMemberListProps = members => {
  const rows = members.map(member => ({
    ...member,
    photo: <TablePhoto src={member.photo} />,
    role: <RoleLabel {...getLabelColors(member.role)}>{member.role}</RoleLabel>,
    roleString: member.role,
    delimiter: 'since',
    more: <OptionsTooltip
      icon={<MoreVert />}
      options={[
        {
          content: HOUSEHOLD.CHANGE_ROLE,
          nestedOptions: Object.values(HOUSEHOLD_ROLE_TYPE).map(role => ({
            content: <RoleLabel {...getLabelColors(role)}>{role}</RoleLabel>,
            clickHandler: role !== member.role
              ? () => console.log('changing role to: ', role)
              : null,
          })),
        }, {
          content: HOUSEHOLD.REMOVE_USER,
          clickHandler: () => console.log('removing user'),
        },
      ]}
    />,
  }));
  const keys = [
    { name: 'photo' },
    { name: 'nickname', bold: true, growing: true },
    { name: 'role' },
    { name: 'delimiter', fading: true },
    { name: 'date_joined', fading: true },
    { name: 'more' },
  ];
  const sortConfig = [
    { key: 'nickname', icon: <SortByAlpha /> },
    { key: 'roleString', icon: <Grade /> },
    { key: 'date_joined', icon: <CalendarToday /> },
  ];
  const filterKey = 'nickname';

  return {
    rows,
    keys,
    sortConfig,
    filterKey,
  }
}

export const useInvitationListProps = invitations => {
  const rows = invitations.map(invitation => ({
    ...invitation,
    fromPhoto: <TablePhoto src={invitation.fromPhoto} />,
    delimiter: <TableRowIcon><ChevronRight /></TableRowIcon>,
    toPhoto: <TablePhoto src={invitation.toPhoto} />,
    delete: <TableRowIcon color="var(--cRedSecondary)" clickable onClick={() => console.log('clicked')}><Delete /></TableRowIcon>,
  }));
  const keys = [
    { name: 'fromPhoto' },
    { name: 'fromNickname' },
    { name: 'delimiter' },
    { name: 'toPhoto' },
    { name: 'toNickname', bold: true, growing: true },
    { name: 'dateCreated', fading: true },
    { name: 'delete' },
  ];
  const sortConfig = [
    { key: 'toNickname', icon: <SortByAlpha /> },
    { key: 'dateCreated', icon: <CalendarToday /> },
  ];
  const filterKey = 'toNickname';

  return {
    rows,
    keys,
    sortConfig,
    filterKey,
  }
}

export const getLabelColors = role => role === HOUSEHOLD_ROLE_TYPE.ADMIN
  ? { background: 'var(--cBluePrimary)', color: 'var(--cThemeBack)' }
  : role === HOUSEHOLD_ROLE_TYPE.MANAGER
    ? { background: 'var(--cYellowPrimary)', color: 'var(--cThemeBack)' }
    : { background: 'var(--cGreenPrimary)', color: 'var(--cThemeBack)' };
