import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import managementServices from '../../service/management';
import { CREATE_TARGET } from '../constants';

const completedTypes = completeTypes(['ADD_INFO']);

export const actions = createTypes(completedTypes, '@@MANAGEMENT');

export const actionCreators = {
  createManagement: values => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: managementServices.createDocument,
    payload: values,
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.MANAGEMENT.CREATE_MANAGEMENT));
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
};
