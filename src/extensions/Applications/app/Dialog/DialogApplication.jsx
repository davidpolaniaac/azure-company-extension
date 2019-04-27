import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators as applicationActions } from '../../redux/applications/actions';
import GenericForm from '../Form/GenericForm';
import { ACTIONS } from '../../constants/actions';
import { ELEMENTS } from '../../constants/elements';

class DialogApplication extends React.Component {
  onCreate = (values) => {
    const { createApplication } = this.props;
    return createApplication(values);
  }

  onDelete = (values) => {
    const { deleteApplication } = this.props;
    return deleteApplication(values);
  }

  onUpdate = (values) => {
    const { updateApplication } = this.props;
    return updateApplication(values);
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
};

const mapDispatchToProps = dispatch => ({
  createApplication: values => dispatch(applicationActions.createApplication(values)),
  deleteApplication: values => dispatch(applicationActions.deleteApplication(values)),
  updateApplication: values => dispatch(applicationActions.updateApplication(values)),
});

export default connect(null, mapDispatchToProps)(DialogApplication);
