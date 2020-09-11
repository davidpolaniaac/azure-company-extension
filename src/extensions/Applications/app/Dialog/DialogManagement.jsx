import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators as managementActions } from '../../redux/managements/actions';
import GenericForm from '../Form/GenericForm';
import { ACTIONS } from '../../constants/actions';
import { ELEMENTS } from '../../constants/elements';

class DialogManagement extends React.Component {
  onCreate = (values) => {
    const { createManagement, project } = this.props;
    return createManagement(project, values);
  }

  onDelete = (values) => {
    const { deleteManagement, project } = this.props;
    return deleteManagement(project, values);
  }

  onUpdate = (values) => {
    const { updateManagement, project } = this.props;
    return updateManagement(project, values);
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
  updateManagement: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,

};

const mapStateToProps = state => ({
  project: state.project.project,
});

const mapDispatchToProps = dispatch => ({
  createManagement: (project, values) => dispatch(managementActions.createManagement(project, values)),
  deleteManagement: (project, values) => dispatch(managementActions.deleteManagement(project, values)),
  updateManagement: (project, values) => dispatch(managementActions.updateManagement(project, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogManagement);
