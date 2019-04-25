import { createReducer, onReadValue } from 'redux-recompose';

import { actions } from './actions';
import TARGET from './constants';

const initialState = {
  [TARGET]: {
    isVisible: false, element: null, type: null, values: null,
  },
};

const reducerDescription = {
  [actions.TOGGLE_DIALOG]: onReadValue(),
};

const reducer = createReducer(initialState, reducerDescription);

export default reducer;
