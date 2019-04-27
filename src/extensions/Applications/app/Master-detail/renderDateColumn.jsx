import React from 'react';
import { SimpleTableCell } from 'azure-devops-ui/Table';

export const renderDateColumn = (
  rowIndex,
  columnIndex,
  tableColumn,
  tableItem,
) => (
  <SimpleTableCell
    key={`col-${columnIndex}`}
    columnIndex={columnIndex}
    tableColumn={tableColumn}
  >
    <div>{tableItem.date}</div>
  </SimpleTableCell>
);
