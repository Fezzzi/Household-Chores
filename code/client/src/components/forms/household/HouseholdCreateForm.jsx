import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// todo: Replace with some branded Logo-like placeholder
import newHouseholdIcon from '~/static/resources/icons/new-household.svg';

import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { handlerWrapper } from 'clientSrc/helpers/form';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { FORM, HOUSEHOLD } from 'shared/constants/localeMessages';

import HouseholdInvitationForm from './HouseholdInvitationForm';
import { LocaleText, Table } from '../../common';
import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';
import { useInvitationListProps } from 'clientSrc/helpers/household';
import HouseholdFormHeader from 'clientSrc/components/forms/household/HouseholdFormHeader';

const HouseholdCreateForm = ({ connections, setData }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormSending: false,
    inputs: {},
    errors: {},
  });
  const [invitations, setInvitations] = useState([])

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

  const invitationTableProps = useInvitationListProps(invitations)

  const { inputs, errors, isFormSending, submitMessage } = state;

  // todo: Use members.find to find current user data by id from global store
  const currentUser = {
    photo: 'https://assets.sainsburys-groceries.co.uk/gol/3476/1/640x640.jpg',
    name: 'USER USER',
    role: HOUSEHOLD_ROLE_TYPE.ADMIN,
  };

  const handleCreateHousehold = () => console.log('creating...');

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
  })).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HouseholdCreateForm;
