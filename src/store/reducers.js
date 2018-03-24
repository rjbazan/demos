import { combineReducers } from 'redux';
import stateKeys from '../constants/stateKeys';
import layoutReducer from '../containers/layout/reducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({

  [stateKeys.form]: formReducer
});
