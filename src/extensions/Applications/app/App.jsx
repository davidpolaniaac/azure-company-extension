import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SDK from 'azure-devops-extension-sdk';
import SampleData from './data.json';
import Main from './Master-detail/Main';
import { actionCreators as managementsActions } from '../redux/managements/actions';

class App extends React.Component {
  async componentDidMount() {
    await SDK.init();
    await SDK.ready();
    const { getManagements } = this.props;
    getManagements();
  }

  render() {
    const { managementsLoading, managements } = this.props;
    if (managementsLoading) {
      return (<dix>Loading</dix>);
    }

    return (<Main data={managements} />);
  }
}

App.propTypes = {
  managements: PropTypes.arrayOf(PropTypes.shape()),
  getManagements: PropTypes.func.isRequired,
  managementsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  managementsLoading: state.managements.managementsLoading,
  managements: state.managements.managements,
});

const mapDispatchToProps = dispatch => ({
  getManagements: () => dispatch(managementsActions.getManagements()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

