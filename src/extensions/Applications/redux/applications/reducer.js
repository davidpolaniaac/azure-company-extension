import { createReducer, completeState, completeReducer, onReadValue } from 'redux-recompose';
import { actions } from './actions';
import { APPLICATIONS, APPLICATION } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';

const initialStateDescription = {
  [APPLICATIONS]: [],
  [APPLICATION]: '',
  [CREATE_TARGET]: null,
  [DELETE_TARGET]: null,
  [UPDATE_TARGET]: null,
};

const initialState = completeState(initialStateDescription, [APPLICATION]);

const reducerDescription = {
  primaryActions: [actions.ADD_INFO, actions.GET_INFO, actions.DELETE_INFO, actions.UPDATE_INFO],
  override: {
    [actions.SET_INFO]: onReadValue(),
  },
};

const reducer = createReducer(initialState, completeReducer(reducerDescription));

export default reducer;
