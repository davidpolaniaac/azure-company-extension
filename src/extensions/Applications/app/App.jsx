import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SDK from 'azure-devops-extension-sdk';
import Main from './Master-detail/Main';
import CustomDialog from './components/CustomDialog';
import { actionCreators as managementsActions } from '../redux/managements/actions';
import { actionCreators as projectActions } from '../redux/project/actions';

class App extends React.Component {

  getProject = async () => {
    const service = await SDK.getService('ms.vss-tfs-web.tfs-page-data-service');
    const project = await service.getProject();
    return project.id;
  }

  async componentWillMount() {
    const { getManagements, setProject } = this.props;
    const project = await this.getProject();
    setProject(project);
    getManagements(project);
  }

  render() {
    const { managements } = this.props;
    return (
      <>
        <CustomDialog />
        <Main data={managements} />
      </>
    );
  }
}

App.propTypes = {
  managements: PropTypes.arrayOf(PropTypes.shape()),
  getManagements: PropTypes.func.isRequired,
  setProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  managementsLoading: state.managements.managementsLoading,
  managements: state.managements.managements,
});

const mapDispatchToProps = dispatch => ({
  setProject: (value) => dispatch(projectActions.setProject(value)),
  getManagements: (value) => dispatch(managementsActions.getManagements(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
