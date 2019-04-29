import React from 'react';
import { TextField } from 'azure-devops-ui/TextField';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import InitialMasterPanelContent from './InitialMasterPanelContent';
import CustomHeader from '../components/CustomHeader';
import InitialDetailView from './InitialDetailView';
import commandBarItems from './commandBarItems';
import { ELEMENTS } from '../../constants/elements';


function initialPayload(data, value, setManagement, getApplications) {
  return ({
    key: 'initial',
    masterPanelContent: {
      renderContent: (parentItem, initialSelectedMasterItem) => (
        <InitialMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} data={data} />
      ),
      renderHeader: () => (
        <CustomHeader CommandBarItems={commandBarItems} element={ELEMENTS.MANAGEMENT} title="Managements" />
      ),
      renderSearch: () => (
        <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search management" />
      ),
      onBackButtonClick: () => false,
    },
    detailsContent: {
      renderContent: (item) => {
        setManagement(item.id || '');
        if (item.id) getApplications(item.id);
        return <InitialDetailView detailItem={item} />;
      },
    },
    selectedMasterItem: new ObservableValue(value),
    parentItem: undefined,
  });
}

export default initialPayload;
