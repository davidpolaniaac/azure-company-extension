import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'azure-devops-ui/Dialog';
import { Observer } from 'azure-devops-ui/Observer';
import { actionCreators as dialogActions } from '../../../redux/dialog/actions';
import { capitalize } from '../../utils';
import CustomComponent from './CustomComponent';

class CustomDialog extends Component {
  componentWillUnmount() {
    this.props.dismissDialog();
  }

  render() {
    const {
      isDialogVisible, dismissDialog, dialogType, dialogElement,
    } = this.props;

    return (
      <Observer isDialogOpen={isDialogVisible}>
        {props => (props.isDialogOpen ? (
          <Dialog
            titleProps={{ text: `${capitalize(dialogType)} ${dialogElement}` }}
            onDismiss={dismissDialog}
          >
            <CustomComponent DismissDialog={dismissDialog} Element={dialogElement} Type={dialogType} />
          </Dialog>
        ) : null)}
      </Observer>
    );
  }
}

CustomDialog.defaultProps = {
  dialogType: '',
  dialogElement: '',
};

CustomDialog.propTypes = {
  isDialogVisible: PropTypes.bool.isRequired,
  dismissDialog: PropTypes.func.isRequired,
  dialogType: PropTypes.string,
  dialogElement: PropTypes.string,
};

const mapStateToProps = state => ({
  isDialogVisible: state.dialog.dialog.isVisible,
  dialogElement: state.dialog.dialog.element,
  dialogType: state.dialog.dialog.type,
});

const mapDispatchToProps = dispatch => ({
  dismissDialog: () => dispatch(dialogActions.dismissDialog()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDialog);
