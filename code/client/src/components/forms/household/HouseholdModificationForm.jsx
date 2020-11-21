import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { handlerWrapper } from 'clientSrc/helpers/form';
import { useMemberListProps, useInvitationListProps } from 'clientSrc/helpers/household';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { FORM, HOUSEHOLD } from 'shared/constants/localeMessages';

import HOUSEHOLD_ROLE_TYPE from 'shared/constants/householdRoleType';
import { useSelector } from 'react-redux';
import { PROFILE } from 'shared/constants/settingsDataKeys';
import HouseholdFormHeader from './HouseholdFormHeader';
import HouseholdInvitationForm from './HouseholdInvitationForm';
import LocaleText from '../../common/LocaleText';
import Table from '../../common/Table';
import { SimpleFloatingElement } from '../../portals';

const HouseholdModificationForm = ({ household, connections }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    submitMessage: FORM.SAVE,
    isFormSending: false,
    isFormValid: true,
    inputs: {},
    errors: {},
  });
  // This state holds information about sending state of leave/delete buttons in household header
  const [sendingField, setSendingField] = useState(null);
  const [newInvitations, setNewInvitations] = useState([]);

  useEffect(() => () => timer && clearTimeout(timer), []);

  const handleSubmit = handlerWrapper(() => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
      submitMessage: FORM.SAVING,
    }));

    setTimer(setTimeout(
      () => {
        if (setState) {
          setState(prevState => ({
            ...prevState,
            isFormSending: false,
            submitMessage: FORM.SAVE,
          }));
        }
        if (setSendingField) {
          setSendingField(null);
        }
      }, SUBMIT_TIMEOUT));
  });

  const { photo, name, members, invitations } = household;
  const memberTableProps = useMemberListProps(members);
  const invitationTableProps = useInvitationListProps(invitations);

  const { inputs, errors, isFormSending, isFormValid, submitMessage } = state;

  const userState = useSelector(({ app }) => app.user);
  // todo: Use members.find to find current user data by id from global store
  const currentUser = useMemo(() => ({
    id: userState[PROFILE.ID],
    photo: userState[PROFILE.PHOTO],
    name: userState[PROFILE.NAME],
    role: HOUSEHOLD_ROLE_TYPE.ADMIN,
  }), [userState]);

  const handleLeaveHousehold = e => {
    setSendingField({ [HOUSEHOLD.LEAVE]: HOUSEHOLD.LEAVING });
    handleSubmit(e);
    console.log('leaving...');
  };

  const handleDeleteHousehold = e => {
    setSendingField({ [HOUSEHOLD.DELETE]: HOUSEHOLD.DELETING });
    handleSubmit(e);
    console.log('deleting...');
  };

  return (
    <>
      {Object.keys(inputs).length > 0 && (
        <SimpleFloatingElement
          message={submitMessage}
          sending={isFormSending}
          enabled={isFormValid}
          icon={<Save />}
          onClick={handleSubmit}
        />
      )}
      <HouseholdFormHeader
        name={name}
        photo={photo}
        errors={errors}
        inputs={inputs}
        membersCount={members.length}
        setFormState={setState}
        currentUser={currentUser}
        sendingField={sendingField}
        onLeaveHousehold={handleLeaveHousehold}
        onDeleteHousehold={handleDeleteHousehold}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MEMBERS_SECTION} />
      </SectionHeadline>
      <Table {...memberTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USERS} />
      </SectionHeadline>
      <HouseholdInvitationForm
        connections={connections.filter(({ id }) => !newInvitations.find(user => user.id === id))}
        onInvite={id => setNewInvitations(prevState => [...prevState, connections.find(user => user.id === id)])}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
      <Table {...invitationTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.MODULES} />
      </SectionHeadline>

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.ADD_MODULES} />
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
  }),
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })),
};

export default HouseholdModificationForm;
