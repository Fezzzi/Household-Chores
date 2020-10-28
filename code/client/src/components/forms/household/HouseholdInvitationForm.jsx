import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Search, SortByAlpha } from '@material-ui/icons';

import {
  InvitationFormNode,
  InvitationFormNodeName,
  InvitationFormNodePhoto, InvitationNodesWrapper,
} from 'clientSrc/styles/blocks/households';
import {
  TableBox, TableHeaderBox, TableHeaderCell, TableSingleRowBox, TableSorterIcon,
} from 'clientSrc/styles/blocks/table';
import { useTableLogic } from 'clientSrc/helpers/table';
import { COMMON, HOUSEHOLD } from 'shared/constants/localeMessages';

import MiniTextInput from '../inputs/MiniTextInput';
import MiniButton from '../common/MiniButton';
import LocaleText from '../../common/LocaleText';

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
      <TableSingleRowBox height="130px">
        <InvitationNodesWrapper>
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
        </InvitationNodesWrapper>
      </TableSingleRowBox>
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
