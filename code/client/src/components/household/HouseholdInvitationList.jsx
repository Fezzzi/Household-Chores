import React from 'react';
import PropTypes from 'prop-types';

import { UserList } from 'clientSrc/styles/blocks/users';
import { InputRow } from 'clientSrc/styles/blocks/form';
import { FORM } from 'shared/constants/localeMessages';

import HouseholdInvitationNode from './HouseholdInvitationNode';
import LocaleText from '../common/LocaleText';

const HouseholdInvitationList = ({ invitations, setData }) => invitations?.length
  ? (
    <UserList>
      {invitations.map((invitation, index) => (
        <HouseholdInvitationNode
          key={`invitations-${index}`}
          invitation={invitation}
          setData={setData}
        />
      )
      )}
    </UserList>
  ) : (
    <InputRow>
      <LocaleText message={FORM.NO_HOUSEHOLD_REQUESTS} />
    </InputRow>
  );

HouseholdInvitationList.propTypes = {
  invitations: PropTypes.arrayOf(
    PropTypes.shape({
      fromId: PropTypes.number.isRequired,
      fromNickname: PropTypes.string.isRequired,
      fromPhoto: PropTypes.string.isRequired,
      id_household: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      message: PropTypes.string,
      photo: PropTypes.string,
    })
  ).isRequired,
  setData: PropTypes.func.isRequired,
};

export default HouseholdInvitationList;
