import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Search } from '@material-ui/icons'

import {
  TableBox, TableHeaderBox, TableHeaderCell, TableRow, TableCell, TableSorterIcon, TableRowsBox, TableBigCell,
} from 'clientSrc/styles/blocks/table'
import { COMMON } from 'shared/constants/localeMessages'
import { useTableLogic } from 'clientSrc/helpers/table'

import { MiniTextInput } from './inputs'

const Table = ({ rows, keys, sortConfig, filterKey, defaultSorter, freeHeight, bigCells }) => {
  const {
    processedRows,
    setQuery,
    sorters,
  } = useTableLogic(rows, sortConfig, filterKey, defaultSorter)

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
      <TableRowsBox freeHeight={freeHeight}>
        {processedRows.map((row, index) => (
          <TableRow key={index} strikethrough={row.strikethrough}>
            {keys.map(({ name, bold, fading, growing }) => row[name] && (bigCells
              ? <TableBigCell key={`${index}-${name}`} boldKey={bold} fadeKey={fading} growing={growing}>{row[name]}</TableBigCell>
              : <TableCell key={`${index}-${name}`} boldKey={bold} fadeKey={fading} growing={growing}>{row[name]}</TableCell>
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
  defaultSorter: 1,
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
  defaultSorter: PropTypes.number,
  filterKey: PropTypes.string,
  freeHeight: PropTypes.bool,
  bigCells: PropTypes.bool,
}

export default Table
