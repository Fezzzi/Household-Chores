import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Search } from '@material-ui/icons'

import {
  TableBox, TableHeaderBox, TableHeaderCell, TableRow, TableCell, TableSorterIcon, TableRowsBox, TableRowStrikethrough,
} from 'clientSrc/styles/blocks/table'
import { COMMON } from 'shared/constants/localeMessages'
import { useTableLogic } from 'clientSrc/helpers/table'

import { MiniTextInput } from './inputs'

const Table = ({ rows, keys, sortConfig, filterKey }) => {
  const {
    processedRows,
    setQuery,
    sorters,
  } = useTableLogic(rows, sortConfig, filterKey)

  const textInputRef = useRef(null)

  return (
    <TableBox>
      <TableHeaderBox>
        {sortConfig && <TableHeaderCell growing>{sorters}</TableHeaderCell>}
        {filterKey && (
          <TableHeaderCell>
            <TableSorterIcon onClick={() => textInputRef.current.focus()}>
              <Search />
            </TableSorterIcon>
            <MiniTextInput
              reference={textInputRef}
              name="table-filter"
              value={COMMON.SEARCH}
              handleChange={setQuery}
            />
          </TableHeaderCell>
        )}
      </TableHeaderBox>
      <TableRowsBox>
        {processedRows.map((row, index) => (
          <TableRow key={index} strikethrough={keys.find(({ name }) => name === 'cancel' && row[name])}>
            {keys.map(({ name, bold, fading, growing }) => row[name] && (
              <TableCell key={`${index}-${name}`} boldKey={bold} fadeKey={fading} growing={growing}>{row[name]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableRowsBox>
    </TableBox>
  )
}

Table.defaultProps = {
  rows: [],
  sortConfig: [],
}

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  keys: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    fading: PropTypes.bool,
    growing: PropTypes.bool,
    link: PropTypes.string,
  })).isRequired,
  sortConfig: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
  })),
  filterKey: PropTypes.string,
}

export default Table
