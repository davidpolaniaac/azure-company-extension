import { createReducer, completeState, completeReducer } from 'redux-recompose';
import { actions } from './actions';
import { MANAGEMENTS } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';

const initialStateDescription = {
  [MANAGEMENTS]: [],
  [CREATE_TARGET]: null,
  [DELETE_TARGET]: null,
  [UPDATE_TARGET]: null,
};

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.ADD_INFO, actions.GET_INFO, actions.DELETE_INFO, actions.UPDATE_INFO],
};

const reducer = createReducer(initialState, completeReducer(reducerDescription));

export default reducer;
