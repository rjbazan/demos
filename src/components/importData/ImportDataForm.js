import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { RaisedButton, MenuItem } from 's1-ui';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import validate from './ImportDataFormValidation';

const ImportDataForm = ({ handleSubmit, reset, pristine, profiles, companies, invalid }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="Name"
      className="input-1"
      component={TextField}
    />

    <Field
      name="Password"
      className="input-2"
      component={TextField}
    />
    <div style={{ textAlign: 'right', padding: '10px' }}>
      <RaisedButton
        type="button"
        label={'Reset'}
        onClick={reset}
        disabled={pristine}
        style={{ marginRight: 20 }}
      />
      <RaisedButton
        type="submit"
        label={'Import Data'}
        secondary
        disabled={invalid}
      />
    </div>
  </form >
);

ImportDataForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool
};

export default reduxForm({
  form: 'ImportDataForm',
  validate
})(ImportDataForm);
