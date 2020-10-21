import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { InputRow } from 'clientSrc/styles/blocks/form';
import { UserList } from 'clientSrc/styles/blocks/users';
import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { TableBox, TableHeaderBox } from 'clientSrc/styles/blocks/table';
import { findUsers } from 'clientSrc/effects/conectionEffects';
import * as NotificationActions from 'clientSrc/actions/notificationActions';
import * as NotificationTypes from 'shared/constants/notificationTypes';
import { ERROR, FORM } from 'shared/constants/localeMessages';

import UserConnectionNode from './UserConnectionNode';
import LocaleText from '../common/LocaleText';
import { SearchBar } from '../forms/common';

const ConnectionSearchForm = ({ tab, size, data, setData, dataKey, emptyMessage, headlineMessage, addNotification }) => {
  const [emptyResultMessage, setEmptyResultMessage] = useState(emptyMessage);

  const searchQuery = useCallback(query => findUsers(query)
      .then(({ data: newData }) => {
        setEmptyResultMessage(FORM.NO_CONNECTIONS_FOUND);
        setData(prevState => ({
          ...prevState,
          ...newData,
        }));
      })
      .catch(() => addNotification(NotificationTypes.ERRORS, ERROR.CONNECTION_ERROR)),
    [setEmptyResultMessage, setData, addNotification]);

  return (
    <>
      <SectionHeadline first>
        <LocaleText message={headlineMessage}/>
      </SectionHeadline>
      <TableBox>
        <TableHeaderBox isBigger>
          <SearchBar searchQuery={searchQuery} />
        </TableHeaderBox>
      </TableBox>
      {data[dataKey]?.length
        ? (
          <UserList>
            {data[dataKey].map((user, index) => (
              <UserConnectionNode
                key={`${dataKey}-${index}`}
                user={user}
                setData={setData}
                tab={tab}
              />
            ))}
          </UserList>
        ) : (
          <InputRow>
            <LocaleText message={emptyResultMessage} />
          </InputRow>
        )}
    </>
  );
};

ConnectionSearchForm.defaultProps = {
  emptyMessage: '',
};

ConnectionSearchForm.propTypes = {
  tab: PropTypes.string.isRequired,
  data: PropTypes.object,
  setData: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string,
  headlineMessage: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addNotification: (type, message) => dispatch(NotificationActions.addNotifications({
    [type]: [message],
  })),
});

export default connect(null, mapDispatchToProps)(ConnectionSearchForm);
