import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { reducer as formReducer } from 'redux-form';
import stateKeys from '../constants/stateKeys';
import ajaxStatusReducer from '../containers/common/ajaxStatusReducer';
import consultaReducer from '../containers/consulta/reducer';

export default combineReducers({
  [stateKeys.form]: formReducer,
  loadingBar: loadingBarReducer,
  [stateKeys.common]: ajaxStatusReducer,
  [stateKeys.consulta]: consultaReducer
});
