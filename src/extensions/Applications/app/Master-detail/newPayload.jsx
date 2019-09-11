import React from 'react';
import { Filter } from 'azure-devops-ui/Utilities/Filter';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { MasterPanelHeader } from 'azure-devops-ui/MasterDetails';
import { InlineKeywordFilterBarItem } from 'azure-devops-ui/TextFilterBarItem';
import NewFilterMasterPanelContent from './newfilterDetailMasterPanelContent';
import MasterPanelContent from './masterPanelContent';
import NewDetailsContent from './newDetailsContent';

function newPayload(parent, data) {
  const filter = new Filter();
  return ({
    key: 'components-details',
    masterPanelContent: {
      renderContent: (parentItem, initialSelectedMasterItem) => (
        <NewFilterMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} filter={filter} filterKey="keyword-detail" Component={MasterPanelContent} />
      ),
      renderHeader: parentItem => (

        <MasterPanelHeader
          title={parentItem.name}
          subTitle={`Created by ${parentItem.userName}`}
        />
      ),
      renderSearch: () => (
        <InlineKeywordFilterBarItem filter={filter} filterItemKey="keyword-detail" />
      ),
    },
    detailsContent: {
      renderContent: item => <NewDetailsContent item={item} />,
    },
    selectedMasterItem: new ObservableValue(data[0] || {}),
    parentItem: parent,
  });
}

export default newPayload;
