import React from 'react';
import { List, ListSelection } from 'azure-devops-ui/List';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { bindSelectionToObservable } from 'azure-devops-ui/MasterDetailsContext';
import { MasterPanelHeader } from 'azure-devops-ui/MasterDetails';
import { TextField } from 'azure-devops-ui/TextField';
import renderNewRow from './renderNewRow';

const newMasterPanelContent = {
  renderContent: (parentItem, initialSelectedMasterItem) => {
    const itemProvider = new ArrayItemProvider(parentItem.components || []);
    const selection = new ListSelection();
    bindSelectionToObservable(selection, itemProvider, initialSelectedMasterItem);
    return (
      <List
        key="new-list"
        itemProvider={itemProvider}
        selection={selection}
        renderRow={renderNewRow}
        width="100%"
      />
    );
  },
  renderHeader: parentItem => (

    <MasterPanelHeader
      title={parentItem.name}
      subTitle={`Created by ${parentItem.userName}`}
    />
  ),
  renderSearch: () => (
    <TextField prefixIconProps={{ iconName: 'Search' }} placeholder="Search component" />
  ),
};

export default newMasterPanelContent;
