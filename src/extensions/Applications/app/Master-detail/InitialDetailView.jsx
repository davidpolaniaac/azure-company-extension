import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { SimpleTableCell, Table } from 'azure-devops-ui/Table';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { Page } from 'azure-devops-ui/Page';
import { Card } from 'azure-devops-ui/Card';
import newMasterPanelContent from './newMasterPanelContent';
import newDetailsContent from './newDetailsContent';
import commandBarItems from './commandBarItems';
import { renderAppNameCell } from './renderAppNameCell';
import { renderDateColumn } from './renderDateColumn';
import CustomHeader from '../components/CustomHeader';
import { ELEMENTS } from '../../constants/elements';
import { actionCreators as applicationsActions } from '../../redux/applications/actions';
import { actionCreators as managementsActions } from '../../redux/managements/actions';

class InitialDetailView extends React.Component {
  componentDidMount() {
    const {
      detailItem, getApplications, setManagement,
    } = this.props;
    setManagement(detailItem.id);
    getApplications(detailItem.id);
  }

  componentWillReceiveProps(newProps) {
    const {
      detailItem, getApplications, setManagement,
    } = newProps;
    setManagement(detailItem.id);
    getApplications(detailItem.id);
  }

  onRowActivated = (event, tableRow) => {
    const item = tableRow.data.components && tableRow.data.components[0] ? tableRow.data.components[0] : {};
    const newPayload = {
      key: 'components-details',
      masterPanelContent: newMasterPanelContent,
      detailsContent: newDetailsContent,
      selectedMasterItem: new ObservableValue(item),
      parentItem: tableRow.data,
    };
    const masterDetailsContext = React.useContext(MasterDetailsContext);
    masterDetailsContext.push(newPayload);
  };

  columns = [
    {
      id: 'applications',
      name: 'Applications',
      width: new ObservableValue(-33),
      renderCell: renderAppNameCell,
    },
    {
      id: 'date',
      name: 'Date',
      width: new ObservableValue(-33),
      renderCell: renderDateColumn,
    },
  ];

  render() {
    const {
      detailItem, applications,
    } = this.props;

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
              columns={this.columns}
              itemProvider={new ArrayItemProvider(applications)}
              showLines
              singleClickActivation
              onActivate={this.onRowActivated}
            />
          </Card>
        </div>
      </Page>
    );
  }
}

InitialDetailView.propTypes = {
  detailItem: PropTypes.element.isRequired,
  getApplications: PropTypes.func.isRequired,
  setManagement: PropTypes.func.isRequired,
  applications: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = state => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = dispatch => ({
  getApplications: managementId => dispatch(applicationsActions.getApplications(managementId)),
  setManagement: managementId => dispatch(managementsActions.setManagement(managementId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialDetailView);
