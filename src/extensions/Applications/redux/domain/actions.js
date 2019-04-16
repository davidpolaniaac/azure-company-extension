import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import domainServices from '../../service/Domain';
import { CREATE_TARGET } from '../constants';

const completedTypes = completeTypes(['ADD_INFO']);

export const actions = createTypes(completedTypes, '@@DOMAIN');

export const actionCreators = {
  createDomain: values => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: domainServices.createDocument,
    payload: values,
    injections: [
      withPostSuccess(async (dispatch) => {
        console.log('Exito');
        dispatch(reset(FORM_NAMES.DOMAIN.CREATE_DOMAIN));
      }),
      withPostFailure((dispatch, response) => {
        console.log('Error:::', response);
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
};
