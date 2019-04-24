import { createTypes } from 'redux-recompose';

import TARGET from './constants';

const types = ['TOGGLE_DIALOG'];

export const actions = createTypes(types, '@@DIALOG');

export const actionCreators = {
  showDialog: (title, type) => dispatch =>
    dispatch({
      type: actions.TOGGLE_DIALOG,
      target: TARGET,
      payload: {
        isVisible: true, type, title,
      },
    }),
  dismissDialog: () => (dispatch) => {
    dispatch({ type: actions.TOGGLE_DIALOG, target: TARGET, payload: { isVisible: false } });
  },
};
