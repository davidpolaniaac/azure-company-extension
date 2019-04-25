import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SampleData from './data.json';
import Main from './Master-detail/Main';
import CustomDialog from './components/CustomDialog';
import { actionCreators as managementsActions } from '../redux/managements/actions';

class App extends React.Component {
  componentDidMount() {
    const { getManagements } = this.props;
    getManagements();
  }

  render() {
    const { managements } = this.props;
    return (
      <>
        <CustomDialog />
        <Main data={SampleData} />
      </>
    );
  }
}

App.propTypes = {
  managements: PropTypes.arrayOf(PropTypes.shape()),
  getManagements: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  managementsLoading: state.managements.managementsLoading,
  managements: state.managements.managements,
});

const mapDispatchToProps = dispatch => ({
  getManagements: () => dispatch(managementsActions.getManagements()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
