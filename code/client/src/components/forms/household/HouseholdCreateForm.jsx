import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
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
import { useDispatch, useSelector } from 'react-redux';
import { HOUSEHOLD_KEYS, PROFILE } from 'shared/constants/settingsDataKeys';
import * as SettingsActions from 'clientSrc/actions/settingsActions';

const HouseholdCreateForm = ({ connections }) => {
  const [timer, setTimer] = useState(null);
  const [state, setState] = useState({
    isFormSending: false,
    inputs: {},
    errors: {},
  });
  const [invitations, setInvitations] = useState([]);

  useEffect(() => () => timer && clearTimeout(timer), []);

  const { inputs, errors, isFormSending } = state;

  const user = useSelector(({ app: { user } }) => user);
  const currentUser = useMemo(() => ({
      id: user[PROFILE.ID],
      photo: user[PROFILE.PHOTO],
      name: user[PROFILE.NAME],
      role: HOUSEHOLD_ROLE_TYPE.ADMIN,
    }), [user]
  );

  const invitationTableProps = useMemo(() => {
    const date = new Date();
    const timeString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.toTimeString().split(' ')[0]}`

    return useInvitationListProps(
      invitations.map(user => ({
        toPhoto: user.photo,
        toNickname: user.nickname,
        toId: user.id,
        fromPhoto: currentUser.photo,
        fromNickname: currentUser.name,
        fromId: currentUser.id,
        dateCreated: timeString,
      }))
      , (fromId, toId) => setInvitations(prevState => prevState.filter(user => user.id !== toId))
    );
  }, [connections, invitations]);

  const dispatch = useDispatch();
  const handleCreateHousehold = useCallback(e => {
    setState(prevState => ({
      ...prevState,
      isFormSending: true,
    }));

    dispatch(SettingsActions.createHousehold({
      inputs: {
        [HOUSEHOLD_KEYS.USER_PHOTO]: currentUser.photo,
        [HOUSEHOLD_KEYS.USER_NAME]: currentUser.name,
        [HOUSEHOLD_KEYS.NAME]: 'New Household',
        [HOUSEHOLD_KEYS.PHOTO]: newHouseholdIcon,
        ...inputs,
      },
      invitations,
    }));
    setTimer(setTimeout(
      () => setState && setState(prevState => ({
        ...prevState,
        isFormSending: false,
      })), SUBMIT_TIMEOUT));
  }, [dispatch, currentUser, invitations]);

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
      <HouseholdInvitationForm
        connections={connections.filter(({ id }) => !invitations.find(user => user.id === id))}
        onInvite={id => setInvitations(prevState => [...prevState, connections.find(user => user.id === id)])}
      />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
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
};

export default HouseholdCreateForm;
