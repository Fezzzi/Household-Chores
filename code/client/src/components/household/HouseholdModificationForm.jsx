import React from 'react';
import PropTypes from 'prop-types';
import { MoreVert, SortByAlpha, CalendarToday, Grade } from '@material-ui/icons';

import { RoleLabel } from 'clientSrc/styles/blocks/households';
import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { TablePhoto } from 'clientSrc/styles/blocks/table';

import HouseholdFormHeader from './HouseholdFormHeader';
import { Table } from '../common';
import {getLabelColors} from 'clientSrc/helpers/household';

const HouseholdModificaionForm = ({ household, tab, setData }) => {
  const { photo, name, members } = household;
  console.log(household, tab);

  return (
    <>
      <HouseholdFormHeader name={name} photo={photo} membersCount={members.length} />

      <SectionHeadline>Members</SectionHeadline>
      <Table
        rows={members.map(member => ({
          ...member,
          photo: <TablePhoto src={member.photo} />,
          role: <RoleLabel {...getLabelColors(member.role)}>{member.role}</RoleLabel>,
          roleString: member.role,
          more: <MoreVert />
        }))}
        keys={[
          { name: 'photo' },
          { name: 'nickname', bold: true, growing: true },
          { name: 'role' },
          { name: 'date_joined', fading: true },
          { name: 'more' }
        ]}
        sortingConfig={[
          { key: 'nickname', icon: <SortByAlpha /> },
          { key: 'roleString', icon: <Grade /> },
          { key: 'date_joined', icon: <CalendarToday /> },
        ]}
      />

      <SectionHeadline>Invitations</SectionHeadline>
    </>
  )
};

HouseholdModificaionForm.defaultProps = {
  household: {
    photo: '',
    name: '',
    members: [],
  },
};

HouseholdModificaionForm.propTypes = {
  household: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    members: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HouseholdModificaionForm;
