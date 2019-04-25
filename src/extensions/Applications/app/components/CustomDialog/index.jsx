import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'azure-devops-ui/Dialog';
import { Observer } from 'azure-devops-ui/Observer';
import { actionCreators as dialogActions } from '../../../redux/dialog/actions';
import DialogManagement from '../../Dialog/DialogManagement';
import { ACTIONS } from '../../../constants/actions';


class CustomDialog extends Component {
  componentWillUnmount() {
    this.props.dismissDialog();
  }

  render() {
    const {
      isDialogVisible, dismissDialog, dialogType, dialogTitle, ...props
    } = this.props;

    return (
      <Observer isDialogOpen={isDialogVisible}>
        {props => (props.isDialogOpen ? (
          <Dialog
            titleProps={{ text: dialogTitle }}
            onDismiss={dismissDialog}
          >
            {(() => {
              switch (dialogType) {
                case 'createManagement':
                  return <DialogManagement onDismiss={dismissDialog} action={ACTIONS.CREATE} />;
                case 'deleteManagement':
                  return <DialogManagement onDismiss={dismissDialog} action={ACTIONS.DELETE} />;
                default:
                  return null;
              }
            })()}
          </Dialog>
        ) : null)}
      </Observer>
    );
  }
}

CustomDialog.defaultProps = {
  dialogType: '',
  dialogTitle: '',
};

CustomDialog.propTypes = {
  isDialogVisible: PropTypes.bool.isRequired,
  dismissDialog: PropTypes.func.isRequired,
  dialogType: PropTypes.string,
  dialogTitle: PropTypes.string,
};

const mapStateToProps = state => ({
  isDialogVisible: state.dialog.dialog.isVisible,
  dialogTitle: state.dialog.dialog.title,
  dialogType: state.dialog.dialog.type,
});

const mapDispatchToProps = dispatch => ({
  dismissDialog: () => dispatch(dialogActions.dismissDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);
