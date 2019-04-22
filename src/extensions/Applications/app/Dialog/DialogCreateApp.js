import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'azure-devops-ui/Dialog';
import { actionCreators as domainActions } from '../../redux/domain/actions';
import CreateApp from '../Form/CreateApp';

class DialogCreateApp extends React.Component {
  onSubmit = (values) => {
    const { createDomain } = this.props;
    return createDomain(values);
  }

  render() {
    const { onDismiss } = this.props;

    return (
      <Dialog
        titleProps={{ text: 'Create Application' }}
        onDismiss={(onDismiss)}
      >
        <CreateApp onSubmit={this.onSubmit} onDismiss={onDismiss} />

      </Dialog>
    );
  }
}

DialogCreateApp.propTypes = {
  createDomain: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createDomain: values => dispatch(domainActions.createDomain(values)),
});

export default connect(null, mapDispatchToProps)(DialogCreateApp);
