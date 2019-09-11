import React from 'react';
import { Filter } from 'azure-devops-ui/Utilities/Filter';
import { ObservableValue } from 'azure-devops-ui/Core/Observable';
import { InlineKeywordFilterBarItem } from 'azure-devops-ui/TextFilterBarItem';
import FilterMasterPanelContent from './filterMasterPanelContent';
import CustomHeader from '../components/CustomHeader';
import InitialDetailView from './InitialDetailView';
import commandBarItems from './commandBarItems';
import MasterPanelContent from './masterPanelContent';
import { ELEMENTS } from '../../constants/elements';

function initialPayload(data, value, setManagement, getApplications) {
  const filter = new Filter();
  return ({
    key: 'initial',
    masterPanelContent: {
      renderContent: (parentItem, initialSelectedMasterItem) => (
        <FilterMasterPanelContent initialSelectedMasterItem={initialSelectedMasterItem} data={data} filter={filter} filterKey="keyword" Component={MasterPanelContent} />
      ),
      renderHeader: () => (
        <CustomHeader CommandBarItems={commandBarItems} element={ELEMENTS.MANAGEMENT} title="Managements" />
      ),
      renderSearch: () => (
        <InlineKeywordFilterBarItem filter={filter} filterItemKey="keyword" />
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
