import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import loadingBarMiddleware from './loadingMiddleware';
import reducers from './reducers';
import initialState from './initialState';

export default createStore(
  reducers,
  initialState,
  applyMiddleware(ReduxThunk, loadingBarMiddleware())
);
