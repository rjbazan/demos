import { connect } from 'react-redux';
import Consulta from '../../components/consulta/Consulta';
import { queryConsultaForm } from './actions';

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, {
  queryConsultaForm
})(Consulta);
