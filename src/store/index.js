import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import initialState from './initialState';

export default createStore(
  reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);
