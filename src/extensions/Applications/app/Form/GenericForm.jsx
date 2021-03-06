import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
import { TextField, TextFieldWidth } from 'azure-devops-ui/TextField';
import PropTypes from 'prop-types';
import { FormItem } from 'azure-devops-ui/FormItem';
import FORM_NAMES from '../../constants/formNames';
import { GENERIC_FIELDS } from '../../constants/fields';
import CustomFormFooter from '../components/CustomFormFooter';

const Name = props => (

  <FormItem message={props.meta.touched && props.meta.error} error={props.meta.touched && props.meta.error}>

    <TextField
      value={props.input.value}
      onChange={props.input.onChange}
      placeholder={props.label}
      width={TextFieldWidth.auto}
    />

  </FormItem>
);


Name.propTypes = {
  meta: PropTypes.element.isRequired,
  input: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
};

const validate = (values) => {
  const errors = {};

  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'required';
    } else if (values[key].length < 5) {
      errors[key] = 'must be at least 5 characters';
    } else if (values[key].length > 80) {
      errors[key] = 'must be less than 80 characters';
    } else if (values[key].length > values[key].trim().length) {
      errors[key] = 'should not start and end with spaces';
    }
  });

  return errors;
};


const GenericForm = props => (

  <form onSubmit={props.handleSubmit}>
    <Field
      name={GENERIC_FIELDS.NAME}
      label={`${props.textField} name`}
      component={Name}
      type="text"
    />

    {props.update &&
      <>
        <br />
        <Field
          name={GENERIC_FIELDS.NEW_NAME}
          label={`new name of the ${props.textField}`}
          component={Name}
          type="text"
        />
      </>
    }
    <br />
    <div>
      <CustomFormFooter {...props} />
    </div>

  </form>

);


GenericForm.propTypes = {
  update: PropTypes.bool,
  titleButton: PropTypes.string.isRequired,
  textField: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};


export default reduxForm({
  form: FORM_NAMES.FORM.GENERIC,
  validate,
})(GenericForm);
