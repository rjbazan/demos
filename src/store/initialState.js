import stateKeys from '../constants/stateKeys';
import commonState from '../containers/common/initialState';
import consultaState from '../containers/consulta/initialState';

export default {
  [stateKeys.common]: commonState,
  [stateKeys.consulta]: consultaState
};
