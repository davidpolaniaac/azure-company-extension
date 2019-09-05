import React from 'react';
import PropTypes from 'prop-types';
import { bindSelectionToObservable } from 'azure-devops-ui/MasterDetailsContext';
import { FILTER_CHANGE_EVENT } from 'azure-devops-ui/Utilities/Filter';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { List, ListSelection } from 'azure-devops-ui/List';
import renderInitialRow from './renderInitialRow';


function InitialMasterPanelContent(props) {
  const initialItemProvider = new ArrayItemProvider(props.data);
  const initialSelection = new ListSelection();

  const filterItems = (items) => {
    if (props.filter.hasChangesToReset()) {
      const filterText = props.filter.getFilterItemValue('keyword');
      const filteredItems = items.filter((item) => {
        let includeItem = true;
        if (filterText) {
          includeItem = item.name.indexOf(filterText) !== -1;
        }
        return includeItem;
      });
      return filteredItems;
    }
    return [...items];
  };

  const onFilterChanged = () => {
    const filteredItems = filterItems(props.data);
    console.log('filteredItems: ', filteredItems);
  };


  React.useEffect(() => {
    props.filter.subscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    return function cleanup() {
      props.filter.unsubscribe(onFilterChanged, FILTER_CHANGE_EVENT);
    };
  });

  React.useEffect(() => {
    bindSelectionToObservable(
      initialSelection,
      initialItemProvider,
      props.initialSelectedMasterItem,
    );
  });

  return (
    <List
      itemProvider={initialItemProvider}
      selection={initialSelection}
      renderRow={renderInitialRow}
      width="100%"
    />
  );
}


InitialMasterPanelContent.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  filter: PropTypes.element.isRequired,
  initialSelectedMasterItem: PropTypes.element.isRequired,
};


export default InitialMasterPanelContent;
