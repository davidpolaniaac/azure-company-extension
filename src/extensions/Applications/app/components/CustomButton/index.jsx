import React from 'react';
import { Button } from 'azure-devops-ui/Button';
import PropTypes from 'prop-types';

function CustomButton({
  loading, text, iconPrepend, iconAppend, ...props
}) {
  return (
    <Button {...props}>
      {loading && <i className="fa fa-spinner fa-spin mr-2" />}
      {!loading && iconPrepend && <i className={`${iconPrepend} px-2`} />}
      {text}
      {!loading && iconAppend && <i className={`${iconAppend} px-2`} />}
    </Button>
  );
}

CustomButton.defaultProps = {
  loading: false,
  text: '',
  iconAppend: null,
  iconPrepend: null,
};

CustomButton.propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  iconPrepend: PropTypes.string,
  iconAppend: PropTypes.string,
};

export default CustomButton;
