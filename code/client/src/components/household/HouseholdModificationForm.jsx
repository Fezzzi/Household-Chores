import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MoreVert, SortByAlpha, CalendarToday, Grade, Save, Delete, ChevronRight } from '@material-ui/icons';

import { RoleLabel } from 'clientSrc/styles/blocks/households';
import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { TablePhoto, TableRowIcon } from 'clientSrc/styles/blocks/table';
import { getLabelColors } from 'clientSrc/helpers/household';
import { handlerWrapper } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';
import { FORM, HOUSEHOLD } from 'shared/constants/localeMessages';

import HouseholdFormHeader from './HouseholdFormHeader';
import HouseholdInvitationForm from './HouseholdInvitationForm';
import { LocaleText, OptionsTooltip, Table } from '../common';
import { SimpleFloatingElement } from '../portals';

const HouseholdModificationForm = ({ household, connections, tab, setData }) => {
  const { photo, name, members, invitations } = household;

  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormSending: false,
    inputs: {},
    errors: {},
  });

  useEffect(() => () => timer && clearTimeout(timer), []);

  const handleSubmit = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: FORM.SAVING,
    }));

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
        submitMessage: FORM.SAVE,
      })), SUBMIT_TIMEOUT));
  });

  const { inputs, errors, isFormSending, submitMessage } = state;

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          enabled={!isFormSending}
          icon={<Save />}
          onClick={handleSubmit}
        />
      )}
      <HouseholdFormHeader name={name} photo={photo} membersCount={members.length} setFormState={setState} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MEMBERS_SECTION} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
      <Table
        rows={members.map(member => ({
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
        }))}
        keys={[
          { name: 'photo' },
          { name: 'nickname', bold: true, growing: true },
          { name: 'role' },
          { name: 'delimiter', fading: true },
          { name: 'date_joined', fading: true },
          { name: 'more' },
        ]}
        sortConfig={[
          { key: 'nickname', icon: <SortByAlpha /> },
          { key: 'roleString', icon: <Grade /> },
          { key: 'date_joined', icon: <CalendarToday /> },
        ]}
        filterKey="nickname"
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USER} />
      </SectionHeadline>
      <HouseholdInvitationForm connections={connections} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
      <Table
        rows={invitations.map(invitation => ({
          ...invitation,
          fromPhoto: <TablePhoto src={invitation.fromPhoto} />,
          delimiter: <TableRowIcon><ChevronRight /></TableRowIcon>,
          toPhoto: <TablePhoto src={invitation.toPhoto} />,
          delete: <TableRowIcon color="var(--cRedSecondary)" clickable onClick={() => console.log('clicked')}><Delete /></TableRowIcon>,
        }))}
        keys={[
          { name: 'fromPhoto' },
          { name: 'fromNickname' },
          { name: 'delimiter' },
          { name: 'toPhoto' },
          { name: 'toNickname', bold: true, growing: true },
          { name: 'dateCreated', fading: true },
          { name: 'delete' },
        ]}
        sortConfig={[
          { key: 'toNickname', icon: <SortByAlpha /> },
          { key: 'dateCreated', icon: <CalendarToday /> },
        ]}
        filterKey="toNickname"
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MODULES} />
      </SectionHeadline>

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.ADD_MODULE} />
      </SectionHeadline>
    </>
  );
};

HouseholdModificationForm.defaultProps = {
  household: {
    photo: '',
    name: '',
    members: [],
    invitations: [],
  },
  connections: [],
};

HouseholdModificationForm.propTypes = {
  household: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      date_joined: PropTypes.string.isRequired,
    })),
    invitations: PropTypes.arrayOf(PropTypes.shape({
      fromId: PropTypes.number.isRequired,
      fromNickname: PropTypes.string.isRequired,
      fromPhoto: PropTypes.string.isRequired,
      toId: PropTypes.number.isRequired,
      toNickname: PropTypes.string.isRequired,
      toPhoto: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
    })),
  }).isRequired,
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HouseholdModificationForm;
