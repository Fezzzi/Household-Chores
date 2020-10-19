import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Search, SortByAlpha } from '@material-ui/icons';

import {
  InvitationFormNode,
  InvitationFormNodeName,
  InvitationFormNodePhoto,
} from 'clientSrc/styles/blocks/households';
import { TableBox, TableHeaderBox, TableHeaderCell, TableRowBox, TableSorterIcon } from 'clientSrc/styles/blocks/table';
import { useTableLogic } from 'clientSrc/helpers/table';
import { COMMON, HOUSEHOLD } from 'shared/constants/localeMessages';

import { MiniTextInput, MiniButton } from '../forms';
import { LocaleText } from '../common';

const HouseholdInvitationForm = ({ connections }) => {
  const {
    processedRows,
    setQuery,
    sorters,
  } = useTableLogic(connections, [{ key: 'nickname', icon: <SortByAlpha /> }], 'nickname');

  const textInputRef = useRef(null);

  return (
    <TableBox>
      <TableHeaderBox>
        <TableHeaderCell growing>{sorters}</TableHeaderCell>
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
      <TableRowBox>
        {processedRows.map(({ id, nickname, photo }) => (
          <InvitationFormNode key={`connection-${id}`}>
            <InvitationFormNodePhoto src={photo} />
            <InvitationFormNodeName>{nickname}</InvitationFormNodeName>
            {/* todo: Add real invitation logic */}
            <MiniButton margin={0} clickHandler={() => console.log('sent invitation to user', id)}>
              <LocaleText message={HOUSEHOLD.INVITE} />
            </MiniButton>
          </InvitationFormNode>
        ))}
      </TableRowBox>
    </TableBox>
  );
};

HouseholdInvitationForm.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    photo: PropTypes.string,
  })).isRequired,
};

export default HouseholdInvitationForm;
