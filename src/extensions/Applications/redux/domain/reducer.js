import { createReducer, completeState, completeReducer } from 'redux-recompose';

import { actions } from './actions';
import { DOMAIN } from './constants';
import { CREATE_TARGET } from '../constants';

const initialStateDescription = {
  [DOMAIN]: [],
  [CREATE_TARGET]: null,
};

const initialState = completeState(initialStateDescription);

const reducerDescription = {
  primaryActions: [actions.ADD_INFO],
};

const reducer = createReducer(initialState, completeReducer(reducerDescription));

export default reducer;
