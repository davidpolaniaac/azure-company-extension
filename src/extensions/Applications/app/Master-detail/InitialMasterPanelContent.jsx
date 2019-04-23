import React from 'react';
import PropTypes from 'prop-types';
import { bindSelectionToObservable } from 'azure-devops-ui/MasterDetailsContext';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { List, ListSelection } from 'azure-devops-ui/List';
import renderInitialRow from './renderInitialRow';

function InitialMasterPanelContent(props) {
  const [initialItemProvider] = React.useState(new ArrayItemProvider(props.data));
  const [initialSelection] = React.useState(new ListSelection());

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
  initialSelectedMasterItem: PropTypes.element.isRequired,
};


export default InitialMasterPanelContent;
