import { showLoading, hideLoading } from 'react-redux-loading-bar';

const defaultTypeSuffixes = ['BEGIN_AJAX_CALL', 'AJAX_CALL_SUCCESS', 'AJAX_CALL_ERROR']

export default function loadingBarMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;

  return ({ dispatch }) => next => (action) => {
    if (action.type) {
      const [PENDING, SUCCESS, REJECTED] = promiseTypeSuffixes;

      const isPending = new RegExp(`${PENDING}$`, 'g');
      const isSUCCESS = new RegExp(`${SUCCESS}$`, 'g');
      const isRejected = new RegExp(`${REJECTED}$`, 'g');


      if (action.type.match(isPending)) {
        dispatch(showLoading());
      } else if (action.type.match(isSUCCESS) ||
                 action.type.match(isRejected)) {
        dispatch(hideLoading());
      }
    }

    return next(action);
  }
}