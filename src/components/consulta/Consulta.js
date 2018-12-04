import React from 'react';
import PropTypes from 'prop-types';
import ConsultaForm from './ConsultaForm';
import './Consulta.css'

class Consulta extends React.Component {

  componentWillMount() {
    document.title = 'Consulta de validez del CPE';
  }

  handleSubmit = (form) => {
    console.log(form);
    this.props.queryConsultaForm(form);
  }

  render() {
    return (
      <ConsultaForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}

Consulta.propTypes = {
  queryConsultaForm: PropTypes.func
};

export default Consulta;
