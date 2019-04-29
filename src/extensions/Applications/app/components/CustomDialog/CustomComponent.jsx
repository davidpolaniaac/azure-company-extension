import React from 'react';
import PropTypes from 'prop-types';
import { ELEMENTS } from '../../../constants/elements';
import DialogManagement from '../../Dialog/DialogManagement';
import DialogApplication from '../../Dialog/DialogApplication';
import DialogComponent from '../../Dialog/DialogComponent';

function CustomComponent(props) {
  switch (props.Element) {
    case ELEMENTS.MANAGEMENT:
      return <DialogManagement onDismiss={props.DismissDialog} action={props.Type} />;
    case ELEMENTS.APPLICATION:
      return <DialogApplication onDismiss={props.DismissDialog} action={props.Type} />;
    case ELEMENTS.COMPONENT:
      return <DialogComponent onDismiss={props.DismissDialog} action={props.Type} />;
    default:
      return null;
  }
}

CustomComponent.propTypes = {
  DismissDialog: PropTypes.func.isRequired,
  Type: PropTypes.string,
  Element: PropTypes.string,
};

export default CustomComponent;
