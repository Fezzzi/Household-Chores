import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { handlerWrapper } from 'clientSrc/helpers/form';
import { useInvitationListProps } from 'clientSrc/helpers/household';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { HOUSEHOLD } from 'shared/constants/localeMessages';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';

// todo: Replace with some branded Logo-like placeholder
import newHouseholdIcon from '~/static/resources/icons/new-household.svg';

import HouseholdFormHeader from './HouseholdFormHeader';
import HouseholdInvitationForm from './HouseholdInvitationForm';
import LocaleText from '../../common/LocaleText';
import Table from '../../common/Table';

const HouseholdCreateForm = ({ connections, setData }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    isFormSending: false,
    inputs: {},
    errors: {},
  });
  const [invitations, setInvitations] = useState([]);

  useEffect(() => () => timer && clearTimeout(timer), []);

  const handleSubmit = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
    }));

    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
      })), SUBMIT_TIMEOUT));
  });

  const invitationTableProps = useInvitationListProps(invitations);

  const { inputs, errors, isFormSending, submitMessage } = state;

  // todo: Use members.find to find current user data by id from global store
  const currentUser = {
    photo: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    name: 'USER USER',
    role: HOUSEHOLD_ROLE_TYPE.ADMIN,
  };

  const handleCreateHousehold = e => {
    handleSubmit(e);
    console.log('creating...');
  };

  return (
    <>
      <HouseholdFormHeader
        name="New Household"
        photo={newHouseholdIcon}
        errors={errors}
        inputs={inputs}
        currentUser={currentUser}
        setFormState={setState}
        membersCount={0}
        sendingField={isFormSending ? { [HOUSEHOLD.CREATE]: HOUSEHOLD.CREATING } : null}
        onCreateHousehold={handleCreateHousehold}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USERS} />
      </SectionHeadline>
      <HouseholdInvitationForm connections={connections} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
      <Table {...invitationTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.ADD_MODULES} />
      </SectionHeadline>
    </>
  );
};

HouseholdCreateForm.defaultProps = {
  connections: [],
};

HouseholdCreateForm.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })),
  setData: PropTypes.func.isRequired,
};

export default HouseholdCreateForm;
