import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCreators as componentsActions } from '../../redux/components/actions';
import GenericForm from '../Form/GenericForm';
import { ACTIONS } from '../../constants/actions';
import { ELEMENTS } from '../../constants/elements';

class DialogComponent extends React.Component {
  onCreate = (values) => {
    const { createComponent, application } = this.props;
    return createComponent(application, values);
  }

  onDelete = (values) => {
    const { deleteComponent, application } = this.props;
    return deleteComponent(application, values);
  }

  onUpdate = (values) => {
    const { updateComponent, application } = this.props;
    return updateComponent(application, values);
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
        textField={ELEMENTS.Component}
        update={action === ACTIONS.UPDATE}
      />
    );
  }
}

DialogComponent.propTypes = {
  action: PropTypes.string.isRequired,
  createComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  application: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  application: state.applications.application,
});

const mapDispatchToProps = dispatch => ({
  createComponent: (application, values) => dispatch(componentsActions.createComponent(application, values)),
  deleteComponent: (application, values) => dispatch(componentsActions.deleteComponent(application, values)),
  updateComponent: (application, values) => dispatch(componentsActions.updateComponent(application, values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogComponent);
