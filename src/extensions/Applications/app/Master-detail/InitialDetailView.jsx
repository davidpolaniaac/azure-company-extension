import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { Table } from 'azure-devops-ui/Table';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { Page } from 'azure-devops-ui/Page';
import { Card } from 'azure-devops-ui/Card';
import { renderCell } from './renderCell';
import { renderDateColumn } from './renderDateColumn';
import newPayload from './newPayload';
import commandBarItems from './commandBarItems';
import CustomHeader from '../components/CustomHeader';
import { ELEMENTS } from '../../constants/elements';
import { actionCreators as applicationsActions } from '../../redux/applications/actions';
import { actionCreators as componentsActions } from '../../redux/components/actions';


function InitialDetailView(props) {
  const masterDetailsContext = React.useContext(MasterDetailsContext);
  const [components, setComponents] = React.useState(props.components);
  const [app, setApp] = React.useState({});
  const previousRef = React.useRef(props.components);
  const {
    detailItem, applications, setApplication, getComponents,
  } = props;

  const columns = [
    {
      id: 'applications',
      name: 'Applications',
      width: new ObservableValue(-33),
      renderCell,
    },
    {
      id: 'date',
      name: 'Date',
      width: new ObservableValue(-33),
      renderCell: renderDateColumn,
    },
  ];

  React.useEffect(() => {
    if (previousRef.current !== props.components) {
      const newView = newPayload(app, props.components);
      masterDetailsContext.push(newView);
    }
    setComponents(props.components);
  }, [props.components]);

  const onRowActivated = async (event, tableRow) => {
    setApplication(tableRow.data.id);
    setApp(tableRow.data);
    await getComponents(tableRow.data.id);
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
  components: PropTypes.arrayOf(PropTypes.shape()),
  setApplication: PropTypes.func.isRequired,
  getComponents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  applications: state.applications.applications,
  components: state.components.components,
});

const mapDispatchToProps = dispatch => ({
  setApplication: applicationId => dispatch(applicationsActions.setApplication(applicationId)),
  getComponents: applicationId => dispatch(componentsActions.getComponents(applicationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialDetailView);
