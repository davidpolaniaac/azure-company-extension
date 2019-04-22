import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField, TextFieldWidth } from 'azure-devops-ui/TextField';
import { Button } from 'azure-devops-ui/Button';
import PropTypes from 'prop-types';
import { ButtonGroup } from 'azure-devops-ui/ButtonGroup';
import { FormItem } from 'azure-devops-ui/FormItem';
import FORM_NAMES from '../../constants/formNames';

const ApplicationName = props => (

  <FormItem message={props.meta.touched && props.meta.error} error={props.meta.touched && props.meta.error}>

    <TextField
      value={props.input.value}
      onChange={props.input.onChange}
      placeholder={props.label}
      width={TextFieldWidth.auto}
    />

  </FormItem>
);


ApplicationName.propTypes = {
  meta: PropTypes.element.isRequired,
  input: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

const validate = (values) => {
  const errors = {};

  if (!values.applicationName) {
    errors.applicationName = 'required';
  } else if (values.applicationName.length < 5) {
    errors.applicationName = 'must be at least 5 characters';
  } else if (values.applicationName.length > 80) {
    errors.applicationName = 'must be less than 80 characters';
  }

  return errors;
};


const CreateApp = props => (

  <form onSubmit={props.handleSubmit}>
    <Field
      name="applicationName"
      label="Application Name"
      component={ApplicationName}
      type="text"
    />
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


CreateApp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};


export default reduxForm({
  form: FORM_NAMES.DOMAIN.CREATE_DOMAIN,
  validate,
})(CreateApp);
