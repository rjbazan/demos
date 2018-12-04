import ConsultaApi from '../../api/consultaApi';
import * as actions from '../../constants/actions';
import { beginAjaxCall, ajaxCallError } from '../common/ajaxStatusActions';

export const queryConsultaFormSuccess = response => ({ type: actions.QUERY_CONSULTA_FORM_SUCCESS, response });

export function queryConsultaForm(params) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return ConsultaApi.ConsultaFormulario(params)
      .then(response => dispatch(queryConsultaFormSuccess(response)))
      .catch((error) => {
        dispatch(ajaxCallError(error.message));
      });
  };
}