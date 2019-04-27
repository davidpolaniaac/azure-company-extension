import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import managementServices from '../../service/documents';
import { MANAGEMENTS, MANAGEMENT } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';
import { normalizeValue } from '../../schema/document';
import { DOCUMENTS } from '../../constants/documents';

const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO'], ['SET_INFO']);

export const actions = createTypes(completedTypes, '@@MANAGEMENT');

export const actionCreators = {
  createManagement: values => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: managementServices.createDocument,
    payload: normalizeValue(DOCUMENTS.MANAGEMENTS, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  getManagements: () => ({
    type: actions.GET_INFO,
    target: MANAGEMENTS,
    service: managementServices.getDocuments,
    payload: DOCUMENTS.MANAGEMENTS,
    failureSelector: response => response.code,
    successSelector: response => response.data,
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
    payload: normalizeValue(DOCUMENTS.MANAGEMENTS, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  updateManagement: values => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: managementServices.updateDocument,
    payload: normalizeValue(DOCUMENTS.MANAGEMENTS, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements());
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  setManagement: values => (dispatch) => {
    console.log(values);
    dispatch({
      type: actions.SET_INFO,
      target: MANAGEMENT,
      payload: values,
    });
  }
  ,
};
