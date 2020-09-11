import { createTypes } from 'redux-recompose';

import TARGET from './constants';

const types = ['SET_INFO'];

export const actions = createTypes(types, '@@PROJECT');

export const actionCreators = {
  setProject: values => (dispatch) => {
    dispatch({
      type: actions.SET_INFO,
      target: TARGET,
      payload: values,
    });
  },
};