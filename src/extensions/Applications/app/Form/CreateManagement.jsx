import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField, TextFieldWidth } from 'azure-devops-ui/TextField';
import { Button } from 'azure-devops-ui/Button';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup';
import { FormItem } from 'azure-devops-ui/FormItem';
import FORM_NAMES from '../../constants/formNames';

const ManagementName = props => (

  <FormItem message={props.meta.touched && props.meta.error} error={props.meta.touched && props.meta.error}>

    <TextField
      value={props.input.value}
      onChange={props.input.onChange}
      placeholder={props.label}
      width={TextFieldWidth.auto}
    />

  </FormItem>
);


ManagementName.propTypes = {
  meta: PropTypes.element.isRequired,
  input: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

const validate = (values) => {
  const errors = {};

  if (!values.ManagementName) {
    errors.ManagementName = 'required';
  } else if (values.ManagementName.length < 5) {
    errors.ManagementName = 'must be at least 5 characters';
  } else if (values.ManagementName.length > 80) {
    errors.ManagementName = 'must be less than 80 characters';
  }

  return errors;
};


const CreateManagement = props => (

  <form onSubmit={props.handleSubmit}>
    <Field
      name="ManagementName"
      label="Management Name"
      component={ManagementName}
      type="text"
    />
    <br />
    <br />
    <div>
      <ButtonGroup>
        <Button
          text="Save"
          primary
          type="submit"
          onClick={() => props.handleSubmit(props.onSubmit)}
        />
        <Button
          text="Cancel"
          onClick={props.onDismiss}
        />
      </ButtonGroup>
    </div>

  </form>

);


CreateManagement.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};


export default reduxForm({
  form: FORM_NAMES.MANAGEMENT.CREATE_MANAGEMENT,
  validate,
})(CreateManagement);
