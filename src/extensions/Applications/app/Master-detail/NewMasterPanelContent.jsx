import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindSelectionToObservable } from 'azure-devops-ui/MasterDetailsContext';
import { ArrayItemProvider } from 'azure-devops-ui/Utilities/Provider';
import { List, ListSelection } from 'azure-devops-ui/List';
import renderInitialRow from './renderInitialRow';

function newMasterPanelContent(props) {
  const initialItemProvider = new ArrayItemProvider(props.components);
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
      renderRow={renderInitialRow}
      width="100%"
    />
  );
}


newMasterPanelContent.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape()),
  initialSelectedMasterItem: PropTypes.element.isRequired,
};

const mapStateToProps = state => ({
  components: state.components.components,
});

export default connect(mapStateToProps, null)(newMasterPanelContent);

