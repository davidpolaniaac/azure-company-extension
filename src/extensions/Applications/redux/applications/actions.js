import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import applicationServices from '../../service/documents';
import { APPLICATIONS, APPLICATION } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';
import { normalizeValue } from '../../schema/document';

const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO'], ['SET_INFO']);

export const actions = createTypes(completedTypes, '@@APPLICATION');

export const actionCreators = {
  createApplication: values => (dispatch, getState) => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: applicationServices.createDocument,
    payload: normalizeValue(getState().managements.management, values),
    injections: [
      withPostSuccess((dispatchInjections) => {
        dispatchInjections(reset(FORM_NAMES.FORM.GENERIC));
        dispatchInjections(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
  getApplications: value => ({
    type: actions.GET_INFO,
    target: APPLICATIONS,
    service: applicationServices.getDocuments,
    payload: value,
    failureSelector: response => response.code,
    successSelector: response => response.data,
    injections: [
      withPostFailure((_, response) => {
        console.log('ERROR GET APPLICATIONS :', response);
      }),
    ],
  }),
  deleteApplication: values => (dispatch, getState) => ({
    type: actions.DELETE_INFO,
    target: DELETE_TARGET,
    service: applicationServices.deleteDocument,
    payload: normalizeValue(getState().managements.management, values),
    injections: [
      withPostSuccess(async () => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
  updateApplication: values => (dispatch, getState) => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: applicationServices.updateDocument,
    payload: normalizeValue(getState().managements.management, values),
    injections: [
      withPostSuccess(async () => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response });
      }),
    ],
  }),
  getApplication: values => dispatch =>
    dispatch({
      type: actions.SET_INFO,
      target: APPLICATION,
      payload: values,
    }),
};
