import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { InputRow } from 'clientSrc/styles/blocks/form';
import { findUsers } from 'clientSrc/effects/conectionEffects';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR, FORM } from 'shared/constants/localeMessages';
import { TABS } from 'shared/constants/settingTypes';

import UserConnectionNode from './UserConnectionNode';
import LocaleText from '../common/LocaleText';
import { Separator, SearchBar } from '../forms/common';

const ConnectionListForm = ({ tab, size, data, setData, dataKey, emptyMessage, addNotification }) => {
  const [userData, setUserData] = useState({});
  const [emptyResultMessage, setEmptyResultMessage] = useState(null);

  useEffect(() => setUserData(data), [data, setUserData]);

  const searchQuery = useCallback(query => findUsers(query)
    .then(({ data: newData }) => {
      setEmptyResultMessage(FORM.NO_CONNECTIONS_FOUND);
      setUserData(prevState => ({
        ...prevState,
        ...newData,
      }));
    })
    .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR)),
  [setEmptyResultMessage, setUserData, addNotification]);

  return (
    <>
      {tab === TABS.FIND_CONNECTION && (
        <>
          <SearchBar searchQuery={searchQuery} />
          <Separator />
        </>
      )}
      {userData[dataKey] && userData[dataKey].length
        ? (
          <UserList size={size}>
            {userData[dataKey].map((user, index) => (
              <UserConnectionNode
                key={`${dataKey}-${index}`}
                user={user}
                userData={userData}
                setData={setData}
                tab={tab}
                size={size}
              />
            )
            )}
          </UserList>
        ) : (
          <InputRow>
            <LocaleText message={emptyResultMessage || emptyMessage} />
          </InputRow>
        )}
    </>
  );
};

ConnectionListForm.defaultProps = {
  emptyMessage: '',
};

ConnectionListForm.propTypes = {
  tab: PropTypes.string.isRequired,
  size: PropTypes.number,
  data: PropTypes.object,
  setData: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(ConnectionListForm);

const UserList = styled.div`
  margin: 0 auto;
  width: 100%;
  min-width: ${props => props.size ?? 420}px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  display: flex;
`;
