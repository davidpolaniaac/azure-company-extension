import React from 'react';
import PropTypes from 'prop-types';
import { bindSelectionToObservable } from 'azure-devops-ui/MasterDetailsContext';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { List, ListSelection } from 'azure-devops-ui/List';
import renderRow from './renderRow';


function MasterPanelContent(props) {
  const initialItemProvider = new ArrayItemProvider(props.data);
  const initialSelection = new ListSelection();

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
      renderRow={renderRow}
      width="100%"
    />
  );
}

MasterPanelContent.propTypes = {
  data: PropTypes.arrayOf().isRequired,
  initialSelectedMasterItem: PropTypes.element.isRequired,
};

export default MasterPanelContent;
