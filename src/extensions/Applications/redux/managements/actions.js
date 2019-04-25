import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import managementServices from '../../service/management';
import { MANAGEMENTS } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';


const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO']);

export const actions = createTypes(completedTypes, '@@MANAGEMENT');

export const actionCreators = {
  createManagement: values => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: managementServices.createDocument,
    payload: values,
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
  getManagements: () => ({
    type: actions.GET_INFO,
    target: MANAGEMENTS,
    service: managementServices.getDocuments,
    failureSelector: response => response.code,
    successSelector: response => response.values,
    injections: [
      withPostFailure((dispatch, response) => {
        console.log('ERROR GET MANAGEMENTS :', response);
      }),
    ],
  }),
  deleteManagement: values => ({
    type: actions.DELETE_INFO,
    target: DELETE_TARGET,
    service: managementServices.deleteDocument,
    payload: values,
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
  updateManagement: values => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: managementServices.updateDocument,
    payload: values,
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
};
