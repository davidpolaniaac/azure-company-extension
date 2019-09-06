import React from 'react';
import { TextField } from 'azure-devops-ui/TextField';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { MasterPanelHeader } from 'azure-devops-ui/MasterDetails';
import NewMasterPanelContent from './newMasterPanelContent';
import NewDetailsContent from './newDetailsContent';

function newPayload(parent) {
  return ({
    key: 'components-details',
    masterPanelContent: {
      renderContent: (parentItem, initialSelectedMasterItem) => (
        <NewMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} />
      ),
      renderHeader: parentItem => (

        <MasterPanelHeader
          title={parentItem.name}
          subTitle={`Created by ${parentItem.userName}`}
        />
      ),
      renderSearch: () => (
        <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search component" />
      ),
    },
    detailsContent: {
      renderContent: item => <NewDetailsContent item={item} />,
    },
    selectedMasterItem: new ObservableValue({}),
    parentItem: parent,
  });
}

export default newPayload;
