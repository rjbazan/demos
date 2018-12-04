import { connect } from 'react-redux';
import Results from '../../components/results/Results';
import stateKeys from '../../constants/stateKeys';

function mapStateToProps(state) {
  console.log(state)
  return {
    status: state[stateKeys.consulta].status
  };
}

export default connect(mapStateToProps)(Results);
