import initialState from './initialState';
import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR, DISMISS_TOAST, AJAX_CALL_SUCCESS } from '../../constants/actions';

export default function ajaxStatusReducer(state = initialState, action) {
  if (action.type === BEGIN_AJAX_CALL) {
    return Object.assign({}, state, {
      ajaxCallCount: state.ajaxCallCount + 1
    });
  } else if (action.type === AJAX_CALL_ERROR) {
    return Object.assign({}, state, {
      ajaxCallCount: state.ajaxCallCount - 1,
      ajaxError: action.type === AJAX_CALL_ERROR,
      ajaxSuccess: false,
      message: action.message
    });
  } else if (action.type === AJAX_CALL_SUCCESS) {
    return Object.assign({}, state, {
      ajaxCallCount: state.ajaxCallCount - 1,
      ajaxSuccess: true,
      ajaxError: false,
      message: action.message
    });
  } else if (action.type === DISMISS_TOAST) {
    return Object.assign({}, state, {
      ajaxError: false,
      ajaxSuccess: false,
      message: null
    });
  }

  return state;
}
