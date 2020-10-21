import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Search } from '@material-ui/icons';

import { InputRow } from 'clientSrc/styles/blocks/form';
import { UserList } from 'clientSrc/styles/blocks/users';
import { SectionHeadline } from 'clientSrc/styles/blocks/settings';
import { TableBox, TableHeaderBox, TableHeaderCell, TableSorterIcon } from 'clientSrc/styles/blocks/table';
import { useTableLogic } from 'clientSrc/helpers/table';
import { COMMON } from 'shared/constants/localeMessages';

import UserConnectionNode from './UserConnectionNode';
import LocaleText from '../common/LocaleText';
import { MiniTextInput } from '../forms/inputs';

const ConnectionListForm = ({ tab, data, setData, dataKey, emptyMessage, headlineMessage }) => {
  const textInputRef = useRef(null);

  const {
    processedRows,
    setQuery,
  } = useTableLogic(data[dataKey] || [], [], 'nickname');

  return (
    <>
      <SectionHeadline first>
        <LocaleText
          message={headlineMessage}
          modifierFunc={data[dataKey]?.length ? text => `${text} (${data[dataKey].length})` : undefined}
        />
      </SectionHeadline>
      {data[dataKey]?.length
        ? (
          <>
            <TableBox>
              <TableHeaderBox>
                <TableHeaderCell growing />
                <TableHeaderCell>
                  <TableSorterIcon onClick={() => textInputRef.current.focus()}>
                    <Search />
                  </TableSorterIcon>
                  <MiniTextInput
                    reference={textInputRef}
                    name="table-filter"
                    message={COMMON.SEARCH}
                    handleChange={setQuery}
                  />
                </TableHeaderCell>
              </TableHeaderBox>
            </TableBox>
            <UserList>
              {processedRows.map((user, index) => (
                <UserConnectionNode
                  key={`${dataKey}-${index}`}
                  user={user}
                  setData={setData}
                  tab={tab}
                />
              ))}
            </UserList>
          </>
        ) : (
          <InputRow>
            <LocaleText message={emptyMessage} />
          </InputRow>
        )}
    </>
  );
};

ConnectionListForm.propTypes = {
  tab: PropTypes.string.isRequired,
  data: PropTypes.object,
  setData: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  headlineMessage: PropTypes.string.isRequired,
};

export default ConnectionListForm;
