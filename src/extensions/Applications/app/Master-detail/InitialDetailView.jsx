import React from 'react';
import PropTypes from 'prop-types';
import { MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { SimpleTableCell, Table, TwoLineTableCell } from 'azure-devops-ui/Table';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { Page } from 'azure-devops-ui/Page';
import { Card } from 'azure-devops-ui/Card';
import newMasterPanelContent from './newMasterPanelContent';
import newDetailsContent from './newDetailsContent';
import commandBarItems from './commandBarItems';
import CustomHeader from '../components/CustomHeader';
import { ELEMENTS } from '../../constants/elements';

function InitialDetailView(props) {
  const masterDetailsContext = React.useContext(MasterDetailsContext);
  const { detailItem } = props;

  const renderCommitNameCell = (
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

  const renderDateColumn = (
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

  const columns = [
    {
      id: 'applications',
      name: 'Applications',
      width: new ObservableValue(-33),
      renderCell: renderCommitNameCell,
    },
    {
      id: 'date',
      name: 'Date',
      width: new ObservableValue(-33),
      renderCell: renderDateColumn,
    },
  ];

  const onRowActivated = (event, tableRow) => {
    const item = tableRow.data.components && tableRow.data.components[0] ? tableRow.data.components[0] : {};
    const newPayload = {
      key: 'commit-details',
      masterPanelContent: newMasterPanelContent,
      detailsContent: newDetailsContent,
      selectedMasterItem: new ObservableValue(item),
      parentItem: tableRow.data,
    };

    masterDetailsContext.push(newPayload);
  };

  return (
    <Page>
      <CustomHeader
        title={detailItem.name}
        description={detailItem.userName}
        CommandBarItems={commandBarItems}
        element={ELEMENTS.APPLICATION}
      />

      <div className="page-content page-content-top">
        <Card
          className="bolt-card-no-vertical-padding"
          contentProps={{ contentPadding: false }}
        >
          <Table
            columns={columns}
            itemProvider={new ArrayItemProvider(detailItem.applications || [])}
            showLines
            singleClickActivation
            onActivate={onRowActivated}
          />
        </Card>
      </div>
    </Page>
  );
}

InitialDetailView.propTypes = {
  detailItem: PropTypes.element.isRequired,
};

export default InitialDetailView;
