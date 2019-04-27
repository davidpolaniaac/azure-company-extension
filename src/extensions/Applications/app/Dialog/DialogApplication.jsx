import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators as applicationActions } from '../../redux/applications/actions';
import GenericForm from '../Form/GenericForm';
import { ACTIONS } from '../../constants/actions';
import { ELEMENTS } from '../../constants/elements';

class DialogApplication extends React.Component {
  onCreate = (values) => {
    const { createApplication, management } = this.props;
    return createApplication(management, values);
  }

  onDelete = (values) => {
    const { deleteApplication, management } = this.props;
    return deleteApplication(management, values);
  }

  onUpdate = (values) => {
    const { updateApplication, management } = this.props;
    return updateApplication(management, values);
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
        textField={ELEMENTS.APPLICATION}
        update={action === ACTIONS.UPDATE}
      />
    );
  }
}

DialogApplication.propTypes = {
  action: PropTypes.string.isRequired,
  createApplication: PropTypes.func.isRequired,
  deleteApplication: PropTypes.func.isRequired,
  updateApplication: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  management: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  management: state.managements.management,
});

const mapDispatchToProps = dispatch => ({
  createApplication: (management, values) => dispatch(applicationActions.createApplication(management, values)),
  deleteApplication: (management, values) => dispatch(applicationActions.deleteApplication(management, values)),
  updateApplication: (management, values) => dispatch(applicationActions.updateApplication(management, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogApplication);
