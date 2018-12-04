import { connect } from 'react-redux';
import stateKeys from '../../constants/stateKeys';
import AppLayout from '../../components/layout/Layout';
import { dismissToast } from '../../containers/common/ajaxStatusActions'

function mapStateToProps(state) {
  return {
    showErrorModal: state[stateKeys.common].ajaxError,
    errorMessage: state[stateKeys.common].message,
  };
}

export default connect(mapStateToProps, {
  dismissToast
})(AppLayout);
