import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators as managementActions } from '../../redux/managements/actions';
import GenericForm from '../Form/GenericForm';
import { ACTIONS } from '../../constants/actions';
import { ELEMENTS } from '../../constants/elements';

class DialogManagement extends React.Component {
  onCreate = (values) => {
    const { createManagement } = this.props;
    return createManagement(values);
  }

  onDelete = (values) => {
    const { deleteManagement } = this.props;
    return deleteManagement(values);
  }

  onUpdate = (values) => {
    const { createManagement } = this.props;
    return createManagement(values);
  }

  getSubmit(action) {
    switch (action) {
      case ACTIONS.CREATE:
        return this.onCreate;
      case ACTIONS.DELETE:
        return this.onDelete;
      case ACTIONS.UPDATE:
        return this.onUpdate;
      default:
        return null;
    }
  }

  render() {
    const { onDismiss, action } = this.props;
    const onSubmit = this.getSubmit(action);

    return (
      <GenericForm
        onSubmit={onSubmit}
        onDismiss={onDismiss}
        titleButton={action}
        textField={ELEMENTS.MANAGEMENT}
        update={action === ACTIONS.UPDATE}
      />
    );
  }
}

DialogManagement.propTypes = {
  action: PropTypes.string.isRequired,
  createManagement: PropTypes.func.isRequired,
  deleteManagement: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createManagement: values => dispatch(managementActions.createManagement(values)),
  deleteManagement: values => dispatch(managementActions.deleteManagement(values)),
});

export default connect(null, mapDispatchToProps)(DialogManagement);
