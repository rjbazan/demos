import initialState from './initialState';
import * as actions from '../../constants/actions';

const consultaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.QUERY_CONSULTA_FORM_SUCCESS:
      return Object.assign({}, state, {
        status: action.response,
      });

      default:
      return state;
  }
  
}

export default consultaReducer;
