import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import './queryBuilder.css';
let initialValues = JSON.parse("{\"conditional\":\"AND\",\"rules\":[{\"type\":1,\"field\":\"[InvoiceNumber]\",\"operator\":\"<\",\"value\":\"555\"},{\"type\":2,\"conditional\":\"AND\",\"rules\":[{\"type\":1,\"field\":\"[InvoiceNumber]\",\"operator\":\"<\",\"value\":\"dddd\"}]}]}");

const operators = [{ text: 'greather than', value: '>' }, { text: 'less than', value: '<' }];
const transactionFields = [{ text: 'Invoice Number', value: '[InvoiceNumber]' }, { text: 'ERP Document', value: '[ERPDcoument]' }];
const conditionals = [{ text: 'or', value: 'OR' }, { text: 'and', value: 'AND' }];

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderRules = ({ fields, showConditional, handleAddRule, handleAddGroup, meta: { error, submitFailed } }) => (
  <ul>
    <li>

      <button type="button" onClick={() => fields.push({ type: 1 })}>
        Add rule
      </button>
      <button type="button" onClick={() => fields.push({ type: 2, conditional: 'OR' })}>
        Add group
      </button>
      {showConditional && <Field
        name={`conditional`}
        floatingLabelText="Condition"
        component={SelectField}
        style={{ width: 90 }}
      >
        {conditionals.map(item => <MenuItem key={item.text} value={item.value} primaryText={item.text} />)}

      </Field>}


      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((rule, index) => (
      <li key={index} className={fields.get(index).type === 2 ? 'query-builder__container' : undefined}>

        {fields.get(index).type === 2 && <Field
          name={`${rule}.conditional`}
          floatingLabelText="Condition"
          component={SelectField}
          style={{ width: 90 }}
        >
          {conditionals.map(item => <MenuItem key={item.text} value={item.value} primaryText={item.text} />)}

        </Field>}

        <h4>Rule #{index + 1}</h4>

        {fields.get(index).type === 1 && <div><Field
          name={`${rule}.field`}
          floatingLabelText="Transaction field"
          component={SelectField}
          autoWidth
        >
          {transactionFields.map(item => <MenuItem key={item.text} value={item.value} primaryText={item.text} />)}
        </Field>

          <Field
            name={`${rule}.operator`}
            floatingLabelText="Operator"
            component={SelectField}
            autoWidth
          >
            {operators.map(item => <MenuItem key={item.text} value={item.value} primaryText={item.text} />)}

          </Field>

          <Field
            name={`${rule}.value`}
            floatingLabelText="Value"
            component={TextField}
          >
          </Field></div>}

        <button
          type="button"
          title="Remove Rule"
          onClick={() => fields.remove(index)}
        >x</button>

        {fields.get(index).type === 2 && <FieldArray name={`${rule}.rules`} component={renderRules} addBtn="Add group" />}

      </li>
    ))}
  </ul>
)

class FieldArraysForm extends React.Component {
  state = {
    rules: []
  }

  handleAddRule = (fields) => {
    this.setState({ rules: this.state.rules.concat({}) })
  }

  handleAddGroup = (fields) => {
    fields.push({})
    this.setState({ test: true })
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} className="query-builder__container">

        <FieldArray name="rules" rules={this.state.rules} component={renderRules} showConditional />

        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
/*   initialValues */
})(FieldArraysForm)
