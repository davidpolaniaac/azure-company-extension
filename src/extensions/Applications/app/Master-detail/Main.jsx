import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BaseMasterDetailsContext, MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { DetailsPanel, MasterPanel } from 'azure-devops-ui/MasterDetails';
import initialPayload from './initialPayload';
import { actionCreators as managementsActions } from '../../redux/managements/actions';
import { actionCreators as applicationsActions } from '../../redux/applications/actions';

function Main(props) {
  const {
    data, setManagement, getApplications, filter,
  } = props;
  const masterDetailsContext = new BaseMasterDetailsContext(
    initialPayload(data, data[0], setManagement, getApplications, filter),
    () => {
      alert("Triggered onExit; this shouldn't happen ever in this app, Critical Error");
    },
  );

  return (
    <MasterDetailsContext.Provider value={masterDetailsContext}>
      <div className="flex-row" style={{ width: '100%' }}>
        <MasterPanel showOnSmallScreens />
        { data.length > 0 && <DetailsPanel /> }
      </div>
    </MasterDetailsContext.Provider>

  );
}


Main.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  setManagement: PropTypes.func.isRequired,
  getApplications: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  setManagement: managementId => dispatch(managementsActions.setManagement(managementId)),
  getApplications: managementId => dispatch(applicationsActions.getApplications(managementId)),

});

export default connect(null, mapDispatchToProps)(Main);
