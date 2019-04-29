import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import componentServices from '../../service/documents';
import { COMPONENTS } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';
import { normalizeValue } from '../../schema/document';

const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO']);

export const actions = createTypes(completedTypes, '@@COMPONENT');

export const actionCreators = {
  createComponent: values => (dispatch, getState) => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: componentServices.createDocument,
    payload: normalizeValue(getState().applications.application, values),
    injections: [
      withPostSuccess(() => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  getComponents: values => ({
    type: actions.GET_INFO,
    target: COMPONENTS,
    service: componentServices.getDocuments,
    payload: values,
    failureSelector: response => response.code,
    successSelector: response => response.data,
    injections: [
      withPostFailure((dispatch, response) => {
        console.log('ERROR GET COMPONENTS :', response);
      }),
    ],
  }),
  deleteComponent: values => (dispatch, getState) => ({
    type: actions.DELETE_INFO,
    target: DELETE_TARGET,
    service: componentServices.deleteDocument,
    payload: normalizeValue(getState().applications.application, values),
    injections: [
      withPostSuccess(() => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  updateComponent: values => (dispatch, getState) => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: componentServices.updateDocument,
    payload: normalizeValue(getState().applications.application, values),
    injections: [
      withPostSuccess(() => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
};
