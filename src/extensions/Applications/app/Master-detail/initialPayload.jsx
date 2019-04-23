import React from 'react';
import PropTypes from 'prop-types';
import { Header, TitleSize } from 'azure-devops-ui/Header';
import { TextField } from 'azure-devops-ui/TextField';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import InitialMasterPanelContent from './InitialMasterPanelContent';
import commandBarItemsSimple from './commandBarItemsSimple';
import InitialDetailView from './InitialDetailView';

function initialPayload(data) {
  return ({
    key: 'initial',
    masterPanelContent: {
      renderContent: (parentItem, initialSelectedMasterItem) => (
        <InitialMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} data={data} />
      ),
      renderHeader: () => (
        <Header
          title="Mgmt"
          commandBarItems={commandBarItemsSimple}
          titleSize={TitleSize.Large}
        />
      ),
      renderSearch: () => (
        <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search managerment" />
      ),
      onBackButtonClick: () => false,
    },
    detailsContent: {
      renderContent: item => <InitialDetailView detailItem={item} />,
    },
    selectedMasterItem: new ObservableValue(data[0]),
    parentItem: undefined,
  });
}

initialPayload.propTypes = {
  data: PropTypes.arrayOf().isRequired,
};


export default initialPayload;
