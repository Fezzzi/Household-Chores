import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import { TableBox, TableHeaderBox, TableHeaderCell, TableRow, TableCell, TableSorterIcon } from 'clientSrc/styles/blocks/table';

const Table = ({ rows, keys, sortingConfig }) => {
  const [state, setState] = useState({
    sorter: 1,
    orderedRows: rows,
  });

  useEffect(() => setState(prevState => ({
    ...prevState,
    orderedRows: rows
  })), [rows]);

  const sortRows = useCallback((key, index) => setState(({ sorter, orderedRows }) => {
    const newSorter = Math.abs(sorter) === index + 1 ? -sorter : index + 1;

    orderedRows.sort((e1, e2) => {
      const order = newSorter > 0 ? 1 : -1;
      return (e1[key] > e2[key]) ? order : (e1[key] < e2[key] ? -order : 0);
    });

    console.log('sorted', orderedRows);
    return {
      sorter: newSorter,
      orderedRows,
    }
  }), [setState]);

  const sorters = useMemo(() => sortingConfig.map(({ key, icon }, index) => (
    <TableSorterIcon
      key={index}
      selected={Math.abs(state.sorter) === index + 1}
      onClick={() => sortRows(key, index)}
    >{icon}</TableSorterIcon>
  )), [sortingConfig, state]);

  const { orderedRows } = state;

  return (
    <TableBox>
      <TableHeaderBox>
        <TableHeaderCell growing={true}>{sorters}</TableHeaderCell>
        <TableHeaderCell>Header</TableHeaderCell>
      </TableHeaderBox>
      {orderedRows.map((row, index) => (
        <TableRow key={index}>
          {keys.map(({ name, bold, fading, growing }) => row[name] && (
            <TableCell key={`${index}-${name}`} boldKey={bold} fadeKey={fading} growing={growing}>{row[name]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBox>
  )
};

Table.defaultProps = {
  rows: [],
  sorters: [],
};

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  keys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    fading: PropTypes.bool,
    growing: PropTypes.bool,
    link: PropTypes.string,
  })).isRequired,
  sortingConfig: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  })),
};

export default Table;
