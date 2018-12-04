import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RaisedButton, MenuItem } from 's1-ui';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TextField from './inputs/Textfield';
import SelectField from './inputs/Select';
import dp from './inputs/DatePicker';

const options = [
  { label: 'RECIBO POR HONORARIOS ELECTRONICO', value: 1 },
  { label: 'FACTURA ELECTRONICA', value: 2 },
  { label: 'BOLETA ELECTRONICA', value: 3 },
  { label: 'NOTA DE CREDITO DE RHE ELECTRONICA', value: 4 },
  { label: 'NOTA DE CREDITO ELECTRONICA - BOLETA', value: 5 },
  { label: 'NOTA DE DEBITO ELECTRONICA - BOLETA', value: 6 },
  { label: 'NOTA DE CREDITO ELECTRONICA - FACTURA', value: 7 },
  { label: 'NOTA DE DEBITO ELECTRONICA - FACTURA', value: 8 },
  { label: 'GUIA DE REMISION REMITENTE - BIENES FISCALIZABLES', value: 9 },
  { label: 'GUIA DE REMISION REMITENTE COMPLEMENTARIA - BIENES FISCALIZABLES', value: 10 },
  { label: 'GUIA DE REMISION TRANSPORTISTA - BIENES FISCALIZABLES', value: 11 },
  { label: 'GUIA DE REMISION TRANSPORTISTA COMPLEMENTARIA - BIENES FISCALIZABLES', value: 12 },
  { label: 'TICKET POS', value: 13 },
  { label: 'COMPROBANTE DE RETENCIÓN', value: 14 },
  { label: 'TICKET ME', value: 15 },
  { label: 'NOTA CREDITO ME', value: 16 },
  { label: 'ENVIO RESUMEN - FACTURA', value: 17 },
  { label: 'ENVIO RESUMEN - BOLETA', value: 18 },
  { label: 'ENVIO RESUMEN - NOTA DE CREDITO', value: 19 },
  { label: 'ENVIO RESUMEN - NOTA DE DEBITO', value: 20 },
  { label: 'ENVIO RESUMEN - TICKECT', value: 21 },
  { label: 'COMPROBANTE DE PERCEPCIÓN', value: 22 }
];

const fiscal = [9, 10, 11, 12];

const today = new Date();
const minDate = new Date(today.setMonth(today.getMonth() - 1));

const NewForm = ({ handleSubmit, reset, tipoComprobante }) => (
  <form onSubmit={ handleSubmit } className="consulta-form">
    <h1 className="text-center">Consulta de Validez de Comprobante de Pago Electrónico</h1>
    <p className="text-center">Señor contribuyente, a través de esta consulta, Usted podrá consultar la validez de la factura electrónica, la boleta de venta electrónica, el DAE,
      la nota electrónica vinculada y la Guía de Remisión Electrónica. Asimismo, podrá consultar si la boleta de venta electrónica y/o la nota electrónica vinculada
      a aquella fueron informadas en un resumen diario a través del Sistema de Emisión Electrónica - OSE.
    </p>
    <p>Ingrese los siguientes datos que figuran en el CPE:</p>
    <div className="form-group">
      <Field
        name="Ruc"
        label="Número de RUC del Emisor"
        component={ TextField }
        markAsRequired
      />
    </div>

    <div className="form-group">
      <Field
        name="TipoComprobante"
        label="Tipo de Comprobante"
        autoWidth
        component={ SelectField }
        markAsRequired
      >
        {/* <MenuItem key={ 1 } value={ 1 } primaryText={ 'Factura Electrónica' } />
        <MenuItem key={ 2 } value={ 2 } primaryText={ 'Boleta de Venta Electrónica' } />
        <MenuItem key={ 3 } value={ 3 } primaryText={ 'Nota de Crédito Electrónica - Factura' } />
        <MenuItem key={ 4 } value={ 4 } primaryText={ 'Nota de Debito Electrónica - Factura' } />
        <MenuItem key={ 6 } value={ 6 } primaryText={ 'Nota de Crédito Electrónica - Boleta de Venta' } />
        <MenuItem key={ 7 } value={ 7 } primaryText={ 'Nota de Debito  Electrónica - Boleta de Venta' } />
        <MenuItem key={ 8 } value={ 8 } primaryText={ 'Guía de Remisión' } />
        <MenuItem key={ 9 } value={ 9 } primaryText={ 'Comprobante de Percepción' } />
        <MenuItem key={ 10 } value={ 10 } primaryText={ 'Comprobante de Retención' } />
        <MenuItem key={ 11 } value={ 11 } primaryText={ 'DAE' } /> */}
        {options.map(x => <MenuItem key={ x.value } value={ x.value } primaryText={ x.label.toLowerCase() } />)}
      </Field>
    </div>

    <div className="form-group">
      <Field
        name="TipoDocumentReceptor"
        label="Tipo de Documento de Identidad del Receptor"
        autoWidth
        component={ SelectField }
      >
        <MenuItem key={ 1 } value={ 1 } primaryText={ 'Sin documento' } />
        <MenuItem key={ 2 } value={ 2 } primaryText={ 'DOC.TRIB.NO.DOM.SIN.RUC' } />
        <MenuItem key={ 3 } value={ 3 } primaryText={ 'DOC. NACIONAL DE IDENTIDAD' } />
        <MenuItem key={ 4 } value={ 4 } primaryText={ 'CARNÉ DE EXTRANJERIA' } />
        <MenuItem key={ 5 } value={ 5 } primaryText={ 'REG.UNICO DE CONTRIBUYENTES' } />
        <MenuItem key={ 6 } value={ 6 } primaryText={ 'PASAPORTE' } />
        <MenuItem key={ 7 } value={ 7 } primaryText={ 'CED.DIPLOMATICA DE IDENTIDAD' } />
      </Field>
    </div>

    <div className="form-group">
      <Field
        name="NumeroDocumentoIdentidadReceptor"
        label="Número Documento de Identidad del Receptor"
        component={ TextField }
      />
    </div>

    <div className="form-group">
      <Field
        name="NumeroComprobante"
        label="Número del Comprobante"
        component={ TextField }
        markAsRequired
      />
    </div>

    <div className="form-group">
      <Field
        name="FechaEmision"
        container="inline"
        mode="landscape"
        autoOk
        minDate={ minDate }
        label="Fecha de Emisión (dd/mm/aaaa)"
        component={ dp }
        DateTimeFormat={ Intl.DateTimeFormat }
        locale="es-AR"
        clearable
        markAsRequired
      />
    </div>

    {!fiscal.includes(tipoComprobante) && <div className="form-group">
      <Field
        name="ImporteTotal"
        label="Importe Total"
        component={ TextField }
        markAsRequired
      />
    </div>}

    <div className="form-group required-red">* Campos obligatorios</div>

    <div style={ { paddingTop: 10, display: 'flex', justifyContent: 'space-evenly' } }>
      <RaisedButton
        type="submit"
        label="Buscar"
        secondary
      />
      <RaisedButton
        type="button"
        label="Cancelar"
        secondary
        onClick={ reset }
      />
    </div>
  </form>
);

NewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const validate = (values) => {
  const errors = {};
  const required = ['Ruc', 'TipoComprobante', 'NumeroComprobante', 'FechaEmision', 'ImporteTotal'];

  required.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Campo obligatorio';
    } else if (field === 'Ruc' && !/\b[0-9]{11}\b/.test(values[field])) {
      errors[field] = 'Numerico longitud 11';
    }
  });

  if (values.NumeroDocumentoIdentidadReceptor) {
    let regex = null;
    let errorText;
    if (values.TipoDocumentReceptor === 3) {
      regex = /\b[0-9]{8}\b/;
      errorText = 'Numerico longitud 8';
    }
    if (values.TipoDocumentReceptor === 4 || values.TipoDocumentReceptor === 6) {
      regex = /\b[a-zA-Z0-9]{12}\b/;
      errorText = 'Alfanumerico longitud 12';
    }
    if (values.TipoDocumentReceptor === 5) {
      regex = /\b[0-9]{11}\b/;
      errorText = 'Numerico longitud 11';
    }
    if (values.TipoDocumentReceptor === 7) {
      regex = /\b[0-9]{15}\b/;
      errorText = 'Numerico longitud 11';
    }
    if (regex !== null && !regex.test(values.NumeroDocumentoIdentidadReceptor)) {
      errors.NumeroDocumentoIdentidadReceptor = errorText;
    }
  }

  return errors;
};

const selector = formValueSelector('NewForm');
const initialValues = {
  TipoComprobante: 1,
  TipoDocumentReceptor: 1
}
export default compose(
  reduxForm({
    form: 'NewForm',
    validate,
    initialValues
  }),
  connect((state) => {
    const tipoComprobante = selector(state, 'TipoComprobante');
    console.log(tipoComprobante)
    return {
      tipoComprobante
    };
  })
)(NewForm);
