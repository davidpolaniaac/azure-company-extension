import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { SimpleTableCell, Table, TwoLineTableCell } from 'azure-devops-ui/Table';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { Page } from 'azure-devops-ui/Page';
import { Card } from 'azure-devops-ui/Card';
import newPayload from './newPayload';
import commandBarItems from './commandBarItems';
import CustomHeader from '../components/CustomHeader';
import { ELEMENTS } from '../../constants/elements';
import { actionCreators as applicationsActions } from '../../redux/applications/actions';
import { actionCreators as componentsActions } from '../../redux/components/actions';


function InitialDetailView(props) {
  const masterDetailsContext = React.useContext(MasterDetailsContext);
  const {
    detailItem, applications, setApplication, getComponents,
  } = props;

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

  const onRowActivated = async (event, tableRow) => {
    setApplication(tableRow.data.id);
    await getComponents(tableRow.data.id);
    const newView = newPayload(tableRow.data);
    masterDetailsContext.push(newView);
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
            itemProvider={new ArrayItemProvider(applications)}
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
  applications: PropTypes.arrayOf(PropTypes.shape()),
  setApplication: PropTypes.func.isRequired,
  getComponents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = dispatch => ({
  setApplication: applicationId => dispatch(applicationsActions.setApplication(applicationId)),
  getComponents: applicationId => dispatch(componentsActions.getComponents(applicationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialDetailView);
