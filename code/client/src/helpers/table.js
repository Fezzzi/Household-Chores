import React, { useMemo, useState } from 'react';

import { TableSorterIcon } from 'clientSrc/styles/blocks/table';

export const useTableLogic = (rows, sortConfig, filterKey) => {
  const [sorter, setSorter] = useState(1);
  const [query, setQuery] = useState('');

  console.log(rows)
  const processedRows = useMemo(() => {
    const newRows = filterKey && query !== ''
      ? rows.filter(row => new RegExp(query, 'i').test(row[filterKey]))
      : [...rows];

    if (sortConfig.length) {
      const key = sortConfig[Math.abs(sorter) - 1].key;
      newRows.sort((e1, e2) => {
        const order = sorter > 0 ? 1 : -1;
        return e1[key] > e2[key] ? order : -order;
      });
    }
    return newRows;
  }, [rows, sortConfig, sorter, query]);

  const sorters = useMemo(() => sortConfig.map(({ key, icon }, index) => (
    <TableSorterIcon
      key={index}
      selected={Math.abs(sorter) === index + 1}
      onClick={() => setSorter(Math.abs(sorter) === index + 1 ? -sorter : index + 1)}
    >{icon}
    </TableSorterIcon>
  )), [sortConfig, sorter]);

  return {
    processedRows,
    setQuery,
    sorters,
  };
};