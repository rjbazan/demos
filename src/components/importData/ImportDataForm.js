import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { RaisedButton, MenuItem } from 's1-ui';
import { Field, reduxForm } from 'redux-form';
import BootstrapCard from 'components/shared/bootstrapCard/BootstrapCard';
import NewSelectField from 'components/shared/inputs/NewSelectField';
import NewFileField from 'components/shared/inputs/NewFileField';
import ImportProfileTable from './ImportProfileTable';
import validate from './ImportDataFormValidation';

const ImportDataForm = ({ handleSubmit, reset, pristine, profiles, companies, invalid }) => (
  <form onSubmit={ handleSubmit }>
    <div>
      <BootstrapCard title="1. Select Import Profile" minWidth={ 900 }>
        <Field
          name="ProfileId"
          profiles={ profiles }
          component={ ImportProfileTable }
        />

      </BootstrapCard>

      <BootstrapCard title="2. Select import parameters" width={ 600 }>
        <Field
          id={ 'select-companies' }
          label="Companies"
          name="CompanyIds"
          multiple
          component={ NewSelectField }
        >
          {companies.map(comp => <MenuItem id={ comp.Key } key={ comp.Key } value={ comp.Key } primaryText={ comp.Value } />)}
        </Field>

        <Field
          id={ 'default-import-behavior' }
          label="Default import behavior"
          name="ImportBehavior"
          component={ NewSelectField }
        >
          <MenuItem id="Insert/Duplicate" value={ 1 } primaryText="Insert/Duplicate" />
          <MenuItem id="Overwrite" value={ 2 } primaryText="Overwrite" />
          <MenuItem id="Skip" value={ 3 } primaryText="Skip" />
        </Field>
      </BootstrapCard>

      <BootstrapCard title="3. Upload Data File" width={ 600 }>
        <Field
          name="FileName"
          onFileChange={ a => console.log(a) }
          component={ NewFileField }
        />
      </BootstrapCard>

    </div>

    <div style={ { textAlign: 'right', padding: '10px' } }>
      <RaisedButton
        type="button"
        label={ 'Reset' }
        onClick={ reset }
        disabled={ pristine }
        style={ { marginRight: 20 } }
      />
      <RaisedButton
        type="submit"
        label={ 'Import Data' }
        secondary
        disabled={ invalid }
      />
    </div>
  </form >
);

ImportDataForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  profiles: PropTypes.array,
  companies: PropTypes.array,
  reset: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool
};

export default compose(
  reduxForm({
    form: 'ImportDataForm',
    validate
  }))(ImportDataForm);
