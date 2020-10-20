import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Save } from '@material-ui/icons';

import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { handlerWrapper } from 'clientSrc/helpers/form';
import { useMemberListProps, useInvitationListProps } from 'clientSrc/helpers/household';
import { SUBMIT_TIMEOUT } from 'clientSrc/constants/common';
import { FORM, HOUSEHOLD } from 'shared/constants/localeMessages';

import HouseholdFormHeader from './HouseholdFormHeader';
import HouseholdInvitationForm from './HouseholdInvitationForm';
import { LocaleText, Table } from '../common';
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

  const memberTableProps = useMemberListProps(members)
  const invitationTableProps = useInvitationListProps(invitations)

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
      <Table {...memberTableProps} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITE_USER} />
      </SectionHeadline>
      <HouseholdInvitationForm connections={connections} />

      <SectionHeadline>
        <LocaleText message={HOUSEHOLD.INVITATIONS} />
      </SectionHeadline>
      {/* todo: Add real clickHandlers */}
      <Table {...invitationTableProps} />

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
