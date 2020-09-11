import { createReducer, onReadValue } from 'redux-recompose';
import { actions } from './actions';
import TARGET from './constants';

const initialState = {
  [TARGET]: '',
};

const reducerDescription = {
  [actions.SET_INFO]: onReadValue(),
};

const reducer = createReducer(initialState, reducerDescription);

export default reducer;
