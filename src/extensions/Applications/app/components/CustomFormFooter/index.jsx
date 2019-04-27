import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup';
import CustomButton from '../CustomButton';

function CustomFormFooter({
  reset, pristine, submitting, error, showButtons, titleButton, onDismiss,
}) {
  return (
    <>
      {!submitting && error && (
      <p className="w-100 my-2 text-danger">
        {error}
      </p>
      )}
      {showButtons && (
        <ButtonGroup>
          <CustomButton
            primary
            loading={submitting}
            disabled={pristine || submitting}
            type="submit"
            text={titleButton}
          />
          <CustomButton
            onClick={() => { reset(); onDismiss(); }}
            text="Cancel"
          />
        </ButtonGroup>
      )}
    </>
  );
}

CustomFormFooter.defaultProps = {
  titleButton: '',
  showButtons: true,
  reset: () => {},
  onDismiss: () => {},
  pristine: true,
};

CustomFormFooter.propTypes = {
  titleButton: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
};

export default CustomFormFooter;
