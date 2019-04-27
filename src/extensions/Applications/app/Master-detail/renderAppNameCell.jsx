import React from 'react';
import { TwoLineTableCell } from 'azure-devops-ui/Table';

export const renderAppNameCell = (
  rowIndex,
  columnIndex,
  tableColumn,
  tableItem,
) => (
  <TwoLineTableCell
    columnIndex={columnIndex}
    className="fontWeightSemiBold fontSizeM scroll-hidden"
    key={`col-${columnIndex}`}
    tableColumn={tableColumn}
    line1={<span className="fontSizeM text-ellipsis">{tableItem.name}</span>}
    line2={
      <span className="fontSize secondary-text flex-center text-ellipsis">
        {tableItem.userName}
      </span>
                }
  />
);
