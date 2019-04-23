import React from 'react';
import PropTypes from 'prop-types';
import { BaseMasterDetailsContext, MasterDetailsContext } from 'azure-devops-ui/MasterDetailsContext';
import { DetailsPanel, MasterPanel } from 'azure-devops-ui/MasterDetails';
import initialPayload from './initialPayload';

function Main({ data }) {
  const masterDetailsContext = new BaseMasterDetailsContext(
    initialPayload(data),
    () => {
      alert("Triggered onExit; this shouldn't happen ever in this app, Critical Error");
    },
  );

  return (
    <MasterDetailsContext.Provider value={masterDetailsContext}>
      <div className="flex-row" style={{ width: '100%' }}>
        <MasterPanel showOnSmallScreens />
        <DetailsPanel />
      </div>
    </MasterDetailsContext.Provider>

  );
}


Main.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};


export default Main;
