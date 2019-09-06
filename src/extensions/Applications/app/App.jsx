import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Main from './Master-detail/Main';
import CustomDialog from './components/CustomDialog';
import { actionCreators as managementsActions } from '../redux/managements/actions';


const dataTest = [
  {
    id: 'App 1',
    name: 'Negocios A',
    userName: 'David',
    date: '2019-03-03',
  },
  {
    id: 'App 2',
    name: 'Negocios B',
    userName: 'David',
    date: '2019-03-03',
  },
  {
    id: 'App 3',
    name: 'Negocios C',
    userName: 'David',
    date: '2019-03-03',
  },
  {
    id: 'App 4',
    name: 'Negocios D',
    userName: 'David',
    date: '2019-03-03',
  },
  {
    id: 'App 5',
    name: 'Negocios E',
    userName: 'David',
    date: '2019-03-03',
  },
];

class App extends React.Component {
  componentWillMount() {
    const { getManagements } = this.props;
    getManagements();
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
};

const mapStateToProps = state => ({
  managementsLoading: state.managements.managementsLoading,
  managements: state.managements.managements,
});

const mapDispatchToProps = dispatch => ({
  getManagements: () => dispatch(managementsActions.getManagements()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
