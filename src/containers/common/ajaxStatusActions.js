import { BEGIN_AJAX_CALL, AJAX_CALL_ERROR, DISMISS_TOAST, AJAX_CALL_SUCCESS } from '../../constants/actions';

export const beginAjaxCall = () => ({ type: BEGIN_AJAX_CALL });

export const ajaxCallError = message => ({ type: AJAX_CALL_ERROR, message });

export const ajaxCallSuccess = message => ({ type: AJAX_CALL_SUCCESS, message });

export const dismissToast = () => ({ type: DISMISS_TOAST });
