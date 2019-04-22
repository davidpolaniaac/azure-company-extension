import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'azure-devops-ui/Dialog';
import { actionCreators as managementActions } from '../../redux/management/actions';
import CreateManagement from '../Form/CreateManagement';

class DialogCreateManagement extends React.Component {
  onSubmit = (values) => {
    const { createManagement } = this.props;
    return createManagement(values);
  }

  render() {
    const { onDismiss } = this.props;

    return (
      <Dialog
        titleProps={{ text: ' Management creation ' }}
        onDismiss={(onDismiss)}
      >
        <CreateManagement onSubmit={this.onSubmit} onDismiss={onDismiss} />

      </Dialog>
    );
  }
}

DialogCreateManagement.propTypes = {
  createManagement: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createManagement: values => dispatch(managementActions.createManagement(values)),
});

export default connect(null, mapDispatchToProps)(DialogCreateManagement);
